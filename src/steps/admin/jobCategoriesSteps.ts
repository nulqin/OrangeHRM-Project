import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { JobCategoriesPage } from '../../pages/admin/JobCategoriesPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { getPage } from '../../utils/browser';
import { TestDataGenerator } from '../../utils/testData';

setDefaultTimeout(120000);

let jobCategoriesPage: JobCategoriesPage;
let loginPage: LoginPage;

// Background Step
Given('I am logged in as admin for job categories', async function () {
  const page = getPage();
  loginPage = new LoginPage(page);
  jobCategoriesPage = new JobCategoriesPage(page);
  
  console.log('\n🔐 Logging in as Admin...\n');
  
  await loginPage.navigateToLoginPage(process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/');
  await loginPage.login('Admin', 'admin123');
  await loginPage.verifyDashboardIsDisplayed();
  
  console.log('✅ Login successful\n');
});

// Navigation
When('I navigate to Job Categories page', async function () {
  await jobCategoriesPage.navigateToJobCategories();
});

When('I navigate to Add Job Category page', async function () {
  await jobCategoriesPage.navigateToAddJobCategoryPage();
});

When('I click Add button on Job Categories page', async function () {
  await jobCategoriesPage.clickAddButton();
});

// Form Actions
When('I enter job category name {string}', async function (name: string) {
  await jobCategoriesPage.enterJobCategoryName(name);
});

When('I enter a random job category name', async function () {
  const randomName = `Category_${TestDataGenerator.generateRandomString(6)}`;
  await jobCategoriesPage.enterJobCategoryName(randomName);
});

When('I click Save button on Job Category form', async function () {
  await jobCategoriesPage.clickSaveButton();
});

When('I click Cancel button on Job Category form', async function () {
  await jobCategoriesPage.clickCancelButton();
});

// Complete Flow
When('I add a new job category with name {string}',
  async function (name: string) {
    await jobCategoriesPage.addNewJobCategory(name);
  });

When('I add a new job category with random name',
  async function () {
    const randomName = `Category_${TestDataGenerator.generateRandomString(6)}`;
    await jobCategoriesPage.addNewJobCategory(randomName);
  });

// Verifications
Then('I should see Job Categories page', async function () {
  await jobCategoriesPage.verifyJobCategoriesPageDisplayed();
});

Then('I should see Add Job Category form', async function () {
  await jobCategoriesPage.verifyAddJobCategoryFormDisplayed();
});

Then('I should see validation errors on Job Category form', async function () {
  await jobCategoriesPage.verifyValidationErrors();
});