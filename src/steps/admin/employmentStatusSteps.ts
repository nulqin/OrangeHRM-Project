import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { EmploymentStatusPage } from '../../pages/admin/EmploymentStatusPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { getPage } from '../../utils/browser';
import { TestDataGenerator } from '../../utils/testData';

setDefaultTimeout(120000);

let employmentStatusPage: EmploymentStatusPage;
let loginPage: LoginPage;

// Background Step
Given('I am logged in as admin for employment status', async function () {
  const page = getPage();
  loginPage = new LoginPage(page);
  employmentStatusPage = new EmploymentStatusPage(page);
  
  console.log('\n🔐 Logging in as Admin...\n');
  
  await loginPage.navigateToLoginPage(process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/');
  await loginPage.login('Admin', 'admin123');
  await loginPage.verifyDashboardIsDisplayed();
  
  console.log('✅ Login successful\n');
});

// Navigation
When('I navigate to Employment Status page', async function () {
  await employmentStatusPage.navigateToEmploymentStatus();
});

When('I navigate to Add Employment Status page', async function () {
  await employmentStatusPage.navigateToAddEmploymentStatusPage();
});

When('I click Add button on Employment Status page', async function () {
  await employmentStatusPage.clickAddButton();
});

// Form Actions
When('I enter employment status name {string}', async function (name: string) {
  await employmentStatusPage.enterEmploymentStatusName(name);
});

When('I enter a random employment status name', async function () {
  const randomName = `Status_${TestDataGenerator.generateRandomString(6)}`;
  await employmentStatusPage.enterEmploymentStatusName(randomName);
});

When('I click Save button on Employment Status form', async function () {
  await employmentStatusPage.clickSaveButton();
});

When('I click Cancel button on Employment Status form', async function () {
  await employmentStatusPage.clickCancelButton();
});

// Complete Flow
When('I add a new employment status with name {string}',
  async function (name: string) {
    await employmentStatusPage.addNewEmploymentStatus(name);
  });

When('I add a new employment status with random name',
  async function () {
    const randomName = `Status_${TestDataGenerator.generateRandomString(6)}`;
    await employmentStatusPage.addNewEmploymentStatus(randomName);
  });

// Verifications
Then('I should see Employment Status page', async function () {
  await employmentStatusPage.verifyEmploymentStatusPageDisplayed();
});

Then('I should see Add Employment Status form', async function () {
  await employmentStatusPage.verifyAddEmploymentStatusFormDisplayed();
});

Then('I should see validation errors on Employment Status form', async function () {
  await employmentStatusPage.verifyValidationErrors();
});