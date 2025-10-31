import { Page, expect } from '@playwright/test';

export class JobTitlesPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Navigate to Job > Job Titles page
  async navigateToJobTitles(): Promise<void> {
    console.log('📍 Navigating to Job > Job Titles...');
    
    //Click Admin menu
    await this.page.waitForTimeout(3000);
    const adminMenu = this.page.locator('a:has-text("Admin")').first();
    await adminMenu.waitFor({ state: 'visible', timeout: 15000 });
    await adminMenu.click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    
    //Click Job menu
    console.log('  Clicking Job menu...');
    const jobMenu = this.page.locator('span:has-text("Job")').first();
    await jobMenu.waitFor({ state: 'visible', timeout: 15000 });
    await jobMenu.click();
    await this.page.waitForTimeout(2000);
    
    //Click Job Titles
    console.log('  Clicking Job Titles...');
    const jobTitlesMenu = this.page.locator('a:has-text("Job Titles")');
    await jobTitlesMenu.waitFor({ state: 'visible', timeout: 15000 });
    await jobTitlesMenu.click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    
    console.log('✓ Job Titles page loaded\n');
  }

  //Click Add button
  async clickAddButton(): Promise<void> {
    console.log('📍 Clicking Add button...');
    
    const addButton = this.page.locator('button').filter({ hasText: 'Add' }).first();
    await addButton.waitFor({ state: 'visible', timeout: 15000 });
    await addButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    
    console.log('✓ Add Job Title form opened\n');
  }

  //Enter Job Title
  async enterJobTitle(jobTitle: string): Promise<void> {
    console.log(`📝 Entering Job Title: ${jobTitle}`);
    
    const field = this.page.locator('label:has-text("Job Title")').locator('..').locator('..').locator('input');
    await field.waitFor({ state: 'visible', timeout: 15000 });
    await field.clear();
    await field.fill(jobTitle);
    await this.page.waitForTimeout(1000);
    console.log(`✓ Job Title entered\n`);
  }

  //Enter Job Description
  async enterJobDescription(description: string): Promise<void> {
    console.log(`📝 Entering Job Description`);
    
    const field = this.page.locator('label:has-text("Job Description")').locator('..').locator('..').locator('textarea');
    await field.waitFor({ state: 'visible', timeout: 15000 });
    await field.clear();
    await field.fill(description);
    await this.page.waitForTimeout(1000);
    console.log(`✓ Job Description entered\n`);
  }

  //Enter Note
  async enterNote(note: string): Promise<void> {
    console.log(`📝 Entering Note`);
    
    const field = this.page.locator('label:has-text("Note")').locator('..').locator('..').locator('textarea');
    await field.waitFor({ state: 'visible', timeout: 15000 });
    await field.clear();
    await field.fill(note);
    await this.page.waitForTimeout(1000);
    console.log(`✓ Note entered\n`);
  }

  //Click Save button
  async clickSaveButton(): Promise<void> {
    console.log(`💾 Clicking Save button...`);
    
    const saveButton = this.page.locator('button[type="submit"]');
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
    
    const cancelButton = this.page.locator('button').filter({ hasText: 'Cancel' });
    await cancelButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    console.log(`✓ Cancelled\n`);
  }

  //Complete flow: Add new job title
  async addNewJobTitle(jobTitle: string, description: string, note: string): Promise<void> {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🚀 ADDING NEW JOB TITLE: ${jobTitle}`);
    console.log(`${'='.repeat(50)}\n`);
    
    await this.enterJobTitle(jobTitle);
    await this.enterJobDescription(description);
    await this.enterNote(note);
    await this.clickSaveButton();
    
    console.log(`${'='.repeat(50)}`);
    console.log(`✅ JOB TITLE ADDITION COMPLETED`);
    console.log(`${'='.repeat(50)}\n`);
  }

  //Verify Job Titles page is displayed
  async verifyJobTitlesPageDisplayed(): Promise<void> {
    console.log('🔍 Verifying Job Titles page...');
    
    await this.page.waitForLoadState('networkidle', { timeout: 60000 });
    await this.page.waitForTimeout(3000);
    
    const currentUrl = this.page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    await this.page.screenshot({ path: 'test-results/job-titles-page-verification.png', fullPage: true });
    
    const verificationMethods = [
      {
        name: 'URL contains job titles',
        check: async () => currentUrl.includes('viewJobTitleList') || currentUrl.includes('jobTitle')
      },
      {
        name: 'Job Titles heading visible',
        check: async () => {
          const heading = this.page.locator('h6, h5').filter({ hasText: /Job Titles/i });
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
        name: 'Job Titles table visible',
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

    console.log('❌ Could not verify Job Titles page');
    throw new Error('Not on Job Titles page. Check screenshot: job-titles-page-verification.png');
  }

  //Verify Add Job Title form is displayed
  async verifyAddJobTitleFormDisplayed(): Promise<void> {
    console.log('🔍 Verifying Add Job Title form...');
    
    const heading = this.page.locator('h6').filter({ hasText: 'Add Job Title' });
    await expect(heading).toBeVisible({ timeout: 15000 });
    console.log('✅ Add Job Title form displayed\n');
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

  //Navigate to Add Job Title page (complete flow)
  async navigateToAddJobTitlePage(): Promise<void> {
    await this.navigateToJobTitles();
    await this.clickAddButton();
  }
}