import { Page, expect } from '@playwright/test';

export class WorkShiftsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to Job > Work Shifts page
   */
  async navigateToWorkShifts(): Promise<void> {
    console.log('📍 Navigating to Job > Work Shifts...');
    
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
    
    // Click Work Shifts
    console.log('  Clicking Work Shifts...');
    const workShiftsMenu = this.page.locator('a:has-text("Work Shifts")');
    await workShiftsMenu.waitFor({ state: 'visible', timeout: 15000 });
    await workShiftsMenu.click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    
    console.log('✓ Work Shifts page loaded\n');
  }

  /**
   * Click Add button
   */
  async clickAddButton(): Promise<void> {
    console.log('📍 Clicking Add button...');
    
    const addButton = this.page.locator('button').filter({ hasText: 'Add' }).first();
    await addButton.waitFor({ state: 'visible', timeout: 15000 });
    await addButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    
    console.log('✓ Add Work Shift form opened\n');
  }

  /**
   * Enter Work Shift Name
   */
  async enterWorkShiftName(name: string): Promise<void> {
    console.log(`📝 Entering Work Shift Name: ${name}`);
    
    const field = this.page.locator('label:has-text("Shift Name")').locator('..').locator('..').locator('input');
    await field.waitFor({ state: 'visible', timeout: 15000 });
    await field.clear();
    await field.fill(name);
    await this.page.waitForTimeout(1000);
    console.log(`✓ Work Shift Name entered\n`);
  }

  /**
   * Click Save button
   */
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

  /**
   * Click Cancel button
   */
  async clickCancelButton(): Promise<void> {
    console.log(`❌ Clicking Cancel button...`);
    
    const cancelButton = this.page.locator('button').filter({ hasText: 'Cancel' }).first();
    await cancelButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    console.log(`✓ Cancelled\n`);
  }

  /**
   * Complete flow: Add new work shift
   */
  async addNewWorkShift(name: string): Promise<void> {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🚀 ADDING NEW WORK SHIFT: ${name}`);
    console.log(`${'='.repeat(50)}\n`);
    
    await this.enterWorkShiftName(name);
    await this.clickSaveButton();
    
    console.log(`${'='.repeat(50)}`);
    console.log(`✅ WORK SHIFT ADDITION COMPLETED`);
    console.log(`${'='.repeat(50)}\n`);
  }

  /**
   * Verify Work Shifts page is displayed
   */
  async verifyWorkShiftsPageDisplayed(): Promise<void> {
    console.log('🔍 Verifying Work Shifts page...');
    
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    
    const currentUrl = this.page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    await this.page.screenshot({ path: 'test-results/work-shifts-page-verification.png', fullPage: true });
    
    const verificationMethods = [
      {
        name: 'URL contains work shifts',
        check: async () => currentUrl.includes('workShift') || currentUrl.includes('viewWorkShift')
      },
      {
        name: 'Work Shifts heading visible',
        check: async () => {
          const heading = this.page.locator('h6, h5').filter({ hasText: /Work Shifts/i });
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
        name: 'Work Shifts table visible',
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

    console.log('❌ Could not verify Work Shifts page');
    throw new Error('Not on Work Shifts page. Check screenshot: work-shifts-page-verification.png');
  }

  /**
   * Verify Add Work Shift form is displayed
   */
  async verifyAddWorkShiftFormDisplayed(): Promise<void> {
    console.log('🔍 Verifying Add Work Shift form...');
    
    const heading = this.page.locator('h6').filter({ hasText: 'Add Work Shift' });
    await expect(heading).toBeVisible({ timeout: 15000 });
    console.log('✅ Add Work Shift form displayed\n');
  }

  /**
   * Verify validation errors
   */
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

  /**
   * Navigate to Add Work Shift page (complete flow)
   */
  async navigateToAddWorkShiftPage(): Promise<void> {
    await this.navigateToWorkShifts();
    await this.clickAddButton();
  }
}