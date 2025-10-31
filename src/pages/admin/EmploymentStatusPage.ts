import { Page, expect } from '@playwright/test';

export class EmploymentStatusPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Navigate to Job > Employment Status page
  async navigateToEmploymentStatus(): Promise<void> {
    console.log('📍 Navigating to Job > Employment Status...');
    
    // Click Admin menu
    await this.page.waitForTimeout(3000);
    const adminMenu = this.page.locator('a:has-text("Admin")').first();
    await adminMenu.waitFor({ state: 'visible', timeout: 15000 });
    await adminMenu.click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    
    // Click Job menu
    console.log('  Clicking Job menu...');
    const jobMenu = this.page.locator('span:has-text("Job")').first();
    await jobMenu.waitFor({ state: 'visible', timeout: 15000 });
    await jobMenu.click();
    await this.page.waitForTimeout(2000);
    
    // Click Employment Status
    console.log('  Clicking Employment Status...');
    const employmentStatusMenu = this.page.locator('a:has-text("Employment Status")');
    await employmentStatusMenu.waitFor({ state: 'visible', timeout: 15000 });
    await employmentStatusMenu.click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    
    console.log('✓ Employment Status page loaded\n');
  }

  //Click Add button
  async clickAddButton(): Promise<void> {
    console.log('📍 Clicking Add button...');
    
    const addButton = this.page.locator('button').filter({ hasText: 'Add' }).first();
    await addButton.waitFor({ state: 'visible', timeout: 15000 });
    await addButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    
    console.log('✓ Add Employment Status form opened\n');
  }

  //Enter Employment Status Name
  async enterEmploymentStatusName(name: string): Promise<void> {
    console.log(`📝 Entering Employment Status Name: ${name}`);
    
    const field = this.page.locator('label:has-text("Name")').locator('..').locator('..').locator('input');
    await field.waitFor({ state: 'visible', timeout: 15000 });
    await field.clear();
    await field.fill(name);
    await this.page.waitForTimeout(1000);
    console.log(`✓ Employment Status Name entered\n`);
  }

  //Click Save button
  async clickSaveButton(): Promise<void> {
    console.log(`💾 Clicking Save button...`);
    
    const saveButton = this.page.locator('button[type="submit"]').first();
    await saveButton.waitFor({ state: 'visible', timeout: 10000 });
    await saveButton.click();
    
    console.log('  Waiting for response...');
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(5000);
    console.log(`✓ Save completed\n`);
  }

  //Click Cancel button
  async clickCancelButton(): Promise<void> {
    console.log(`❌ Clicking Cancel button...`);
    
    const cancelButton = this.page.locator('button').filter({ hasText: 'Cancel' }).first();
    await cancelButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    console.log(`✓ Cancelled\n`);
  }

  //Complete flow: Add new employment status
  async addNewEmploymentStatus(name: string): Promise<void> {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🚀 ADDING NEW EMPLOYMENT STATUS: ${name}`);
    console.log(`${'='.repeat(50)}\n`);
    
    await this.enterEmploymentStatusName(name);
    await this.clickSaveButton();
    
    console.log(`${'='.repeat(50)}`);
    console.log(`✅ EMPLOYMENT STATUS ADDITION COMPLETED`);
    console.log(`${'='.repeat(50)}\n`);
  }

  //Verify Employment Status page is displayed
  async verifyEmploymentStatusPageDisplayed(): Promise<void> {
    console.log('🔍 Verifying Employment Status page...');
    
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    
    const currentUrl = this.page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    await this.page.screenshot({ path: 'test-results/employment-status-page-verification.png', fullPage: true });
    
    const verificationMethods = [
      {
        name: 'URL contains employment status',
        check: async () => currentUrl.includes('employmentStatus') || currentUrl.includes('viewEmploymentStatus')
      },
      {
        name: 'Employment Status heading visible',
        check: async () => {
          const heading = this.page.locator('h6, h5').filter({ hasText: /Employment Status/i });
          return await heading.isVisible().catch(() => false);
        }
      },
      {
        name: 'Add button visible',
        check: async () => {
          const addButton = this.page.locator('button').filter({ hasText: 'Add' });
          return await addButton.isVisible().catch(() => false);
        }
      },
      {
        name: 'Employment Status table visible',
        check: async () => {
          const table = this.page.locator('.oxd-table, .oxd-table-body');
          return await table.isVisible().catch(() => false);
        }
      },
      {
        name: 'Records count displayed',
        check: async () => {
          const recordCount = this.page.locator('.orangehrm-horizontal-padding span');
          const count = await recordCount.count();
          return count > 0;
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

    console.log('❌ Could not verify Employment Status page');
    throw new Error('Not on Employment Status page. Check screenshot: employment-status-page-verification.png');
  }

  // Verify Add Employment Status form is displayed
  async verifyAddEmploymentStatusFormDisplayed(): Promise<void> {
    console.log('🔍 Verifying Add Employment Status form...');
    
    const heading = this.page.locator('h6').filter({ hasText: 'Add Employment Status' });
    await expect(heading).toBeVisible({ timeout: 15000 });
    console.log('✅ Add Employment Status form displayed\n');
  }

  //Verify validation errors
  async verifyValidationErrors(): Promise<void> {
    console.log('🔍 Checking for validation errors...');
    await this.page.waitForTimeout(2000);
    
    const requiredError = this.page.locator('span:has-text("Required")');
    const errorMessage = this.page.locator('.oxd-input-field-error-message');
    
    const requiredCount = await requiredError.count();
    const errorCount = await errorMessage.count();
    
    console.log(`Found ${requiredCount + errorCount} validation error(s)`);
    
    if (requiredCount > 0 || errorCount > 0) {
      console.log(`✅ Validation errors displayed\n`);
      
      if (requiredCount > 0) {
        await expect(requiredError.first()).toBeVisible({ timeout: 10000 });
      } else {
        await expect(errorMessage.first()).toBeVisible({ timeout: 10000 });
      }
      return;
    }

    throw new Error('No validation errors found');
  }

  //Navigate to Add Employment Status page (complete flow)
  async navigateToAddEmploymentStatusPage(): Promise<void> {
    await this.navigateToEmploymentStatus();
    await this.clickAddButton();
  }
}