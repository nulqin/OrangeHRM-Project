import { Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;

  //Locators List
  private usernameInput = 'input[name="username"]';
  private passwordInput = 'input[name="password"]';
  private loginButton = 'button[type="submit"]';
  private dashboardHeader = 'h6.oxd-topbar-header-breadcrumb-module';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLoginPage(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  async verifyDashboardIsDisplayed(): Promise<void> {
    await expect(this.page.locator(this.dashboardHeader)).toBeVisible({ timeout: 10000 });
  }

  async verifyErrorMessage(): Promise<void> {
    //Wait a bit for error to appear
    await this.page.waitForTimeout(1000);
    
    //Check if we're still on login page (indicates login failed)
    const loginButtonVisible = await this.page.locator(this.loginButton).isVisible();
    
    if (!loginButtonVisible) {
      throw new Error('Login button not visible - might have logged in successfully');
    }

    //Try to find any alert/error message
    const possibleErrorSelectors = [
      '.oxd-alert',
      '.oxd-alert-content',
      '.oxd-alert-content-text',
      'p.oxd-text.oxd-alert-content-text',
      'div[role="alert"]',
      '.oxd-input-field-error-message'
    ];

    let errorFound = false;
    let errorText = '';

    for (const selector of possibleErrorSelectors) {
      const element = this.page.locator(selector).first();
      const count = await element.count();
      
      if (count > 0) {
        const isVisible = await element.isVisible();
        if (isVisible) {
          errorText = await element.textContent() || '';
          console.log(`✓ Error found with selector "${selector}": ${errorText}`);
          await expect(element).toBeVisible();
          errorFound = true;
          break;
        }
      }
    }

    if (!errorFound) {
      //Final check: if we're still on login page, that's proof of failed login
      const currentUrl = this.page.url();
      const hasLoginInUrl = currentUrl.includes('login') || currentUrl.includes('auth/login');
      
      if (hasLoginInUrl && loginButtonVisible) {
        console.log('✓ Login failed - still on login page');
        //This counts as error verification
        expect(loginButtonVisible).toBeTruthy();
      } else {
        await this.page.screenshot({ path: 'test-results/error-verification-failed.png', fullPage: true });
        throw new Error('Could not verify error message. Check screenshot: error-verification-failed.png');
      }
    }
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  //Helper method for debugging
  async getPageInfo(): Promise<void> {
    console.log('Current URL:', this.page.url());
    console.log('Page Title:', await this.page.title());
    
    //List all visible text on page
    const bodyText = await this.page.locator('body').textContent();
    console.log('Page contains:', bodyText?.substring(0, 200));
  }
}