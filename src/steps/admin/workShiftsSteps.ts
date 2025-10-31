import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { WorkShiftsPage } from '../../pages/admin/WorkShiftsPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { getPage } from '../../utils/browser';
import { TestDataGenerator } from '../../utils/testData';

setDefaultTimeout(120000);

let workShiftsPage: WorkShiftsPage;
let loginPage: LoginPage;

// Background Step
Given('I am logged in as admin for work shifts', async function () {
  const page = getPage();
  loginPage = new LoginPage(page);
  workShiftsPage = new WorkShiftsPage(page);
  
  console.log('\n🔐 Logging in as Admin...\n');
  
  await loginPage.navigateToLoginPage(process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/');
  await loginPage.login('Admin', 'admin123');
  await loginPage.verifyDashboardIsDisplayed();
  
  console.log('✅ Login successful\n');
});

// Navigation
When('I navigate to Work Shifts page', async function () {
  await workShiftsPage.navigateToWorkShifts();
});

When('I navigate to Add Work Shift page', async function () {
  await workShiftsPage.navigateToAddWorkShiftPage();
});

When('I click Add button on Work Shifts page', async function () {
  await workShiftsPage.clickAddButton();
});

// Form Actions
When('I enter work shift name {string}', async function (name: string) {
  await workShiftsPage.enterWorkShiftName(name);
});

When('I enter a random work shift name', async function () {
  const randomName = `Shift_${TestDataGenerator.generateRandomString(6)}`;
  await workShiftsPage.enterWorkShiftName(randomName);
});

When('I click Save button on Work Shift form', async function () {
  await workShiftsPage.clickSaveButton();
});

When('I click Cancel button on Work Shift form', async function () {
  await workShiftsPage.clickCancelButton();
});

// Complete Flow
When('I add a new work shift with name {string}',
  async function (name: string) {
    await workShiftsPage.addNewWorkShift(name);
  });

When('I add a new work shift with random name',
  async function () {
    const randomName = `Shift_${TestDataGenerator.generateRandomString(6)}`;
    await workShiftsPage.addNewWorkShift(randomName);
  });

// Verifications
Then('I should see Work Shifts page', async function () {
  await workShiftsPage.verifyWorkShiftsPageDisplayed();
});

Then('I should see Add Work Shift form', async function () {
  await workShiftsPage.verifyAddWorkShiftFormDisplayed();
});

Then('I should see validation errors on Work Shift form', async function () {
  await workShiftsPage.verifyValidationErrors();
});