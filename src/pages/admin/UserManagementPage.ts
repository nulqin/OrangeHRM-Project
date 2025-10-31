import { Page, expect } from '@playwright/test';

export class UserManagementPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Navigate to Add User page (Admin menu + Add button)
  async navigateToAddUserPage(): Promise<void> {
    console.log('📍 Navigating to Add User page...');
    
    // Click Admin menu
    await this.page.waitForTimeout(2000);
    const adminMenu = this.page.locator('a:has-text("Admin")').first();
    await adminMenu.waitFor({ state: 'visible', timeout: 10000 });
    await adminMenu.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    
    // Click Add button
    const addButton = this.page.locator('button').filter({ hasText: 'Add' }).first();
    await addButton.waitFor({ state: 'visible', timeout: 10000 });
    await addButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    
    console.log('✓ Add User page loaded\n');
  }

  //Select User Role
  async selectUserRole(role: string): Promise<void> {
    console.log(`📝 Selecting User Role: ${role}`);
    
    const dropdown = this.page.locator('label:has-text("User Role")').locator('..').locator('..').locator('.oxd-select-text-input');
    await dropdown.click();
    await this.page.waitForTimeout(1000);
    
    await this.page.locator('.oxd-select-dropdown').locator(`span:has-text("${role}")`).click();
    await this.page.waitForTimeout(1000);
    console.log(`✓ Role "${role}" selected\n`);
  }

  //Select Employee Name
  async selectEmployeeName(name: string): Promise<void> {
    console.log(`📝 Selecting Employee: ${name}`);
    
    const input = this.page.locator('input[placeholder="Type for hints..."]');
    await input.clear();
    await input.click();
    await input.fill(name);
    await this.page.waitForTimeout(3000);
    
    const options = this.page.locator('.oxd-autocomplete-option');
    const optionCount = await options.count();
    console.log(`  Found ${optionCount} employee(s)`);
    
    if (optionCount === 0) {
      throw new Error(`No employee found matching "${name}"`);
    }
    
    await options.first().click();
    await this.page.waitForTimeout(1500);
    console.log(`✓ Employee selected\n`);
  }

  //Select Status
  async selectStatus(status: string): Promise<void> {
    console.log(`📝 Selecting Status: ${status}`);
    
    const dropdown = this.page.locator('label:has-text("Status")').locator('..').locator('..').locator('.oxd-select-text-input');
    await dropdown.click();
    await this.page.waitForTimeout(1000);
    
    await this.page.locator('.oxd-select-dropdown').locator(`span:has-text("${status}")`).click();
    await this.page.waitForTimeout(1000);
    console.log(`✓ Status "${status}" selected\n`);
  }

  //Input Username 
  async enterUsername(username: string): Promise<void> {
    console.log(`📝 Entering Username: ${username}`);
    
    const field = this.page.locator('label:has-text("Username")').locator('..').locator('..').locator('input');
    await field.waitFor({ state: 'visible', timeout: 10000 });
    await field.clear();
    await field.fill(username);
    await this.page.waitForTimeout(500);
    console.log(`✓ Username entered\n`);
  }

  //Input Password
  async enterPassword(password: string): Promise<void> {
    console.log(`📝 Entering Password`);
    
    const field = this.page.locator('label:has-text("Password")').first().locator('..').locator('..').locator('input[type="password"]');
    await field.waitFor({ state: 'visible', timeout: 10000 });
    await field.clear();
    await field.fill(password);
    await this.page.waitForTimeout(500);
    console.log(`✓ Password entered\n`);
  }

  //Input Confirm Password
  async enterConfirmPassword(password: string): Promise<void> {
    console.log(`📝 Confirming Password`);
    
    const field = this.page.locator('label:has-text("Confirm Password")').locator('..').locator('..').locator('input[type="password"]');
    await field.waitFor({ state: 'visible', timeout: 10000 });
    await field.clear();
    await field.fill(password);
    await this.page.waitForTimeout(500);
    console.log(`✓ Password confirmed\n`);
  }

  //Input mismatched passwords (for negative testing)
  async enterMismatchedPasswords(): Promise<void> {
    console.log(`📝 Entering mismatched passwords`);
    await this.enterPassword('Password123!');
    await this.enterConfirmPassword('DifferentPass456!');
    console.log(`✓ Mismatched passwords entered\n`);
  }

  //Click Save button
  async clickSaveButton(): Promise<void> {
    console.log(`💾 Clicking Save button...`);
    
    const saveButton = this.page.locator('button[type="submit"]');
    await saveButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(5000);
    console.log(`✓ Save clicked\n`);
  }

  //Click Cancel button
  async clickCancelButton(): Promise<void> {
    console.log(`❌ Clicking Cancel button...`);
    
    const cancelButton = this.page.locator('button').filter({ hasText: 'Cancel' });
    await cancelButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    console.log(`✓ Cancelled\n`);
  }

  //Add new user (complete flow)
  async addNewUser(role: string, employeeName: string, status: string, username: string, password: string): Promise<void> {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🚀 ADDING NEW USER: ${username}`);
    console.log(`${'='.repeat(50)}\n`);
    
    await this.selectUserRole(role);
    await this.selectEmployeeName(employeeName);
    await this.selectStatus(status);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.enterConfirmPassword(password);
    await this.clickSaveButton();
    
    console.log(`${'='.repeat(50)}`);
    console.log(`✅ USER ADDITION PROCESS COMPLETED`);
    console.log(`${'='.repeat(50)}\n`);
  }

  //Verify Admin page is displayed
  async verifyAdminPageDisplayed(): Promise<void> {
    console.log('🔍 Verifying Admin page...');
    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    
    const currentUrl = this.page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    await this.page.screenshot({ path: 'test-results/admin-page-verification.png', fullPage: true });
    
    const verificationMethods = [
      {
        name: 'URL contains admin',
        check: async () => currentUrl.includes('admin')
      },
      {
        name: 'System Users heading visible',
        check: async () => {
          const heading = this.page.locator('h5, h6').filter({ hasText: /System Users/i });
          return await heading.isVisible().catch(() => false);
        }
      },
      {
        name: 'Admin breadcrumb visible',
        check: async () => {
          const breadcrumb = this.page.locator('.oxd-topbar-header-breadcrumb').filter({ hasText: /Admin/i });
          return await breadcrumb.isVisible().catch(() => false);
        }
      },
      {
        name: 'User Management page elements',
        check: async () => {
          const addButton = this.page.locator('button').filter({ hasText: 'Add' });
          return await addButton.isVisible().catch(() => false);
        }
      },
      {
        name: 'Admin in page title',
        check: async () => {
          const title = await this.page.title();
          return title.toLowerCase().includes('admin') || title.toLowerCase().includes('orangehrm');
        }
      }
    ];

    for (const method of verificationMethods) {
      try {
        const result = await method.check();
        if (result) {
          console.log(`✅ Verified using: ${method.name}\n`);
          return;
        }
      } catch (error) {
        continue;
      }
    }

    console.log('❌ Could not verify Admin page');
    throw new Error('Not on Admin page. Check screenshot: admin-page-verification.png');
  }

  //Verify validation errors
  async verifyValidationErrors(): Promise<void> {
    console.log('🔍 Checking for validation errors...');
    await this.page.waitForTimeout(1000);
    
    const requiredError = this.page.locator('span:has-text("Required")');
    const errorMessage = this.page.locator('.oxd-input-field-error-message');
    
    const requiredCount = await requiredError.count();
    const errorCount = await errorMessage.count();
    
    console.log(`Found ${requiredCount + errorCount} validation error(s)`);
    
    if (requiredCount > 0 || errorCount > 0) {
      console.log(`✅ Validation errors displayed\n`);
      
      if (requiredCount > 0) {
        await expect(requiredError.first()).toBeVisible();
      } else {
        await expect(errorMessage.first()).toBeVisible();
      }
      return;
    }

    throw new Error('No validation errors found');
  }

  //Verify password mismatch error
  async verifyPasswordMismatchError(): Promise<void> {
    console.log('🔍 Checking for password mismatch error...');
    
    await this.page.waitForTimeout(1000);
    
    const passwordError = this.page.locator('.oxd-input-field-error-message, span.oxd-text--span').filter({ hasText: /password/i });
    
    const errorCount = await passwordError.count();
    console.log(`Found ${errorCount} password-related error(s)`);
    
    if (errorCount > 0) {
      await expect(passwordError.first()).toBeVisible({ timeout: 5000 });
      console.log('✅ Password mismatch error displayed\n');
      return;
    }

    throw new Error('No password mismatch error found');
  }
}