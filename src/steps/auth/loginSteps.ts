import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/auth/LoginPage';
import { getPage } from '../../utils/browser';

setDefaultTimeout(60000);

let loginPage: LoginPage;

Given('I am on the OrangeHRM login page', async function () {
  const page = getPage();
  loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage(process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/');
});

When('I enter username {string}', async function (username: string) {
  await loginPage.enterUsername(username);
});

When('I enter password {string}', async function (password: string) {
  await loginPage.enterPassword(password);
});

When('I click on the login button', async function () {
  await loginPage.clickLoginButton();
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  await loginPage.login(username, password);
});

Then('I should see the dashboard page', async function () {
  await loginPage.verifyDashboardIsDisplayed();
});

Then('I should see an error message', async function () {
  await loginPage.verifyErrorMessage();
});