import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { JobTitlesPage } from '../../pages/admin/JobTitlesPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { getPage } from '../../utils/browser';
import { TestDataGenerator } from '../../utils/testData';

setDefaultTimeout(90000);

let jobTitlesPage: JobTitlesPage;
let loginPage: LoginPage;

// Background Step
Given('I am logged in as admin for job titles', async function () {
  const page = getPage();
  loginPage = new LoginPage(page);
  jobTitlesPage = new JobTitlesPage(page);
  
  console.log('\n🔐 Logging in as Admin...\n');
  
  await loginPage.navigateToLoginPage(process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/');
  await loginPage.login('Admin', 'admin123');
  await loginPage.verifyDashboardIsDisplayed();
  
  console.log('✅ Login successful\n');
});

// Navigation
When('I navigate to Job Titles page', async function () {
  await jobTitlesPage.navigateToJobTitles();
});

When('I navigate to Add Job Title page', async function () {
  await jobTitlesPage.navigateToAddJobTitlePage();
});

When('I click Add button on Job Titles page', async function () {
  await jobTitlesPage.clickAddButton();
});

// Form Actions
When('I enter job title {string}', async function (jobTitle: string) {
  await jobTitlesPage.enterJobTitle(jobTitle);
});

When('I enter a random job title', async function () {
  const randomJobTitle = `Job_${TestDataGenerator.generateRandomString(6)}`;
  await jobTitlesPage.enterJobTitle(randomJobTitle);
});

When('I enter job description {string}', async function (description: string) {
  await jobTitlesPage.enterJobDescription(description);
});

When('I enter note {string}', async function (note: string) {
  await jobTitlesPage.enterNote(note);
});

When('I click Save button on Job Title form', async function () {
  await jobTitlesPage.clickSaveButton();
});

When('I click Cancel button on Job Title form', async function () {
  await jobTitlesPage.clickCancelButton();
});

// Complete Flow
When('I add a new job title with title {string}, description {string}, and note {string}',
  async function (title: string, description: string, note: string) {
    await jobTitlesPage.addNewJobTitle(title, description, note);
  });

When('I add a new job title with random data',
  async function () {
    const randomTitle = `JobTitle_${TestDataGenerator.generateRandomString(6)}`;
    const description = 'This is an automated test job description';
    const note = 'Created by automation test';
    await jobTitlesPage.addNewJobTitle(randomTitle, description, note);
  });

// Verifications
Then('I should see Job Titles page', async function () {
  await jobTitlesPage.verifyJobTitlesPageDisplayed();
});

Then('I should see Add Job Title form', async function () {
  await jobTitlesPage.verifyAddJobTitleFormDisplayed();
});

Then('I should see validation errors on Job Title form', async function () {
  await jobTitlesPage.verifyValidationErrors();
});