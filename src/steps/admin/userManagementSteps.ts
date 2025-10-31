import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { UserManagementPage } from '../../pages/admin/UserManagementPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { getPage } from '../../utils/browser';
import { TestDataGenerator } from '../../utils/testData';

setDefaultTimeout(90000);

let userManagementPage: UserManagementPage;
let loginPage: LoginPage;

//Background Step
Given('I am logged in as admin', async function () {
  const page = getPage();
  loginPage = new LoginPage(page);
  userManagementPage = new UserManagementPage(page);
  
  console.log('\n🔐 Logging in as Admin...\n');
  
  await loginPage.navigateToLoginPage(process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/');
  await loginPage.login('Admin', 'admin123');
  await loginPage.verifyDashboardIsDisplayed();
  
  console.log('✅ Login successful\n');
});

//Navigation
When('I navigate to Add User page', async function () {
  await userManagementPage.navigateToAddUserPage();
});

//Form Actions
When('I select user role {string}', async function (role: string) {
  await userManagementPage.selectUserRole(role);
});

When('I select employee name {string}', async function (name: string) {
  await userManagementPage.selectEmployeeName(name);
});

When('I select status {string}', async function (status: string) {
  await userManagementPage.selectStatus(status);
});

When('I enter username {string} in user form', async function (username: string) {
  await userManagementPage.enterUsername(username);
});

When('I enter mismatched passwords', async function () {
  await userManagementPage.enterMismatchedPasswords();
});

When('I click Save button', async function () {
  await userManagementPage.clickSaveButton();
});

When('I click Cancel button', async function () {
  await userManagementPage.clickCancelButton();
});

//Complete Flow
When('I add a new user with random credentials as role {string}, employee {string}, status {string}',
  async function (role: string, employee: string, status: string) {
    const username = TestDataGenerator.generateUsername();
    const password = 'Test@1234';
    await userManagementPage.addNewUser(role, employee, status, username, password);
  });

//Verifications
Then('I should see Admin page', async function () {
  await userManagementPage.verifyAdminPageDisplayed();
});

Then('I should see validation errors', async function () {
  await userManagementPage.verifyValidationErrors();
});

Then('I should see password mismatch error', async function () {
  await userManagementPage.verifyPasswordMismatchError();
});