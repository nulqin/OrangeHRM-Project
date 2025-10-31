import { Page, expect } from '@playwright/test';

export class ForgotPasswordPage {
  private page: Page;

  // Locators List
  private forgotPasswordLink = '.oxd-text.oxd-text--p.orangehrm-login-forgot-header';
  private usernameInput = 'input[name="username"]';
  private resetPasswordButton = 'button[type="submit"]';
  private cancelButton = 'button.oxd-button--ghost';
  private successMessage = '.oxd-text.oxd-text--h6.orangehrm-forgot-password-title';
  private loginLink = '.orangehrm-forgot-password-button--cancel';

  constructor(page: Page) {
    this.page = page;
  }

  async clickForgotPasswordLink(): Promise<void> {
    await this.page.click(this.forgotPasswordLink);
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
  }

  async clickResetPasswordButton(): Promise<void> {
    await this.page.click(this.resetPasswordButton);
  }

  async clickCancelButton(): Promise<void> {
    await this.page.click(this.cancelButton);
  }

  async verifyResetPasswordPageIsDisplayed(): Promise<void> {
    await expect(this.page.locator('h6').filter({ hasText: 'Reset Password' })).toBeVisible();
  }

  async verifySuccessMessage(): Promise<void> {
    await expect(this.page.locator(this.successMessage)).toBeVisible({ timeout: 10000 });
  }

  async verifyBackToLoginPage(): Promise<void> {
    await expect(this.page.locator('h5').filter({ hasText: 'Login' })).toBeVisible();
  }
}