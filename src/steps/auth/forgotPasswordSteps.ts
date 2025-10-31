import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { ForgotPasswordPage } from '../../pages/auth/ForgotPasswordPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { getPage } from '../../utils/browser';

setDefaultTimeout(60000);

let forgotPasswordPage: ForgotPasswordPage;
let loginPage: LoginPage;

Given('I am on the OrangeHRM login page for password reset', async function () {
  const page = getPage();
  loginPage = new LoginPage(page);
  forgotPasswordPage = new ForgotPasswordPage(page);
  await loginPage.navigateToLoginPage(process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/');
});

When('I click on Forgot your password link', async function () {
  await forgotPasswordPage.clickForgotPasswordLink();
});

When('I enter username {string} for password reset', async function (username: string) {
  await forgotPasswordPage.enterUsername(username);
});

When('I click on Reset Password button', async function () {
  await forgotPasswordPage.clickResetPasswordButton();
});

When('I click on Cancel button', async function () {
  await forgotPasswordPage.clickCancelButton();
});

Then('I should see the Reset Password page', async function () {
  await forgotPasswordPage.verifyResetPasswordPageIsDisplayed();
});

Then('I should see a password reset success message', async function () {
  await forgotPasswordPage.verifySuccessMessage();
});

Then('I should be redirected back to login page', async function () {
  await forgotPasswordPage.verifyBackToLoginPage();
});