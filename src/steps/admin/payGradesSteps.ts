import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { PayGradesPage } from '../../pages/admin/PayGradesPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { getPage } from '../../utils/browser';
import { TestDataGenerator } from '../../utils/testData';

setDefaultTimeout(120000);

let payGradesPage: PayGradesPage;
let loginPage: LoginPage;

// Background Step
Given('I am logged in as admin for pay grades', async function () {
  const page = getPage();
  loginPage = new LoginPage(page);
  payGradesPage = new PayGradesPage(page);
  
  console.log('\n🔐 Logging in as Admin...\n');
  
  await loginPage.navigateToLoginPage(process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/');
  await loginPage.login('Admin', 'admin123');
  await loginPage.verifyDashboardIsDisplayed();
  
  console.log('✅ Login successful\n');
});

// Navigation
When('I navigate to Pay Grades page', async function () {
  await payGradesPage.navigateToPayGrades();
});

When('I navigate to Add Pay Grade page', async function () {
  await payGradesPage.navigateToAddPayGradePage();
});

When('I click Add button on Pay Grades page', async function () {
  await payGradesPage.clickAddButton();
});

// Form Actions
When('I enter pay grade name {string}', async function (name: string) {
  await payGradesPage.enterPayGradeName(name);
});

When('I enter a random pay grade name', async function () {
  const randomName = `PayGrade_${TestDataGenerator.generateRandomString(6)}`;
  await payGradesPage.enterPayGradeName(randomName);
});

When('I click Save button on Pay Grade form', async function () {
  await payGradesPage.clickSaveButton();
});

When('I click Cancel button on Pay Grade form', async function () {
  await payGradesPage.clickCancelButton();
});

// Complete Flow
When('I add a new pay grade with name {string}',
  async function (name: string) {
    await payGradesPage.addNewPayGrade(name);
  });

When('I add a new pay grade with random name',
  async function () {
    const randomName = `PayGrade_${TestDataGenerator.generateRandomString(6)}`;
    await payGradesPage.addNewPayGrade(randomName);
  });

// Verifications
Then('I should see Pay Grades page', async function () {
  await payGradesPage.verifyPayGradesPageDisplayed();
});

Then('I should see Add Pay Grade form', async function () {
  await payGradesPage.verifyAddPayGradeFormDisplayed();
});

Then('I should see validation errors on Pay Grade form', async function () {
  await payGradesPage.verifyValidationErrors();
});