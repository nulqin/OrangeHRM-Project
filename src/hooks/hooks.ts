import { Before, After, Status, AfterStep } from '@cucumber/cucumber';
import { launchBrowser, closeBrowser, getPage } from '../utils/browser';
import * as dotenv from 'dotenv';

dotenv.config();

Before(async function () {
  await launchBrowser();
});

// Optional: Take screenshot after each step (helpful for debugging)
AfterStep(async function (scenario) {
  const page = getPage();
  
  // Only for failed scenarios or specific tags
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await page.screenshot({ type: 'png', fullPage: true });
    this.attach(screenshot, 'image/png');
  }
});

After(async function (scenario) {
  const page = getPage();
  
  if (scenario.result?.status === Status.FAILED) {
    // Take final screenshot
    const screenshot = await page.screenshot({ type: 'png', fullPage: true });
    this.attach(screenshot, 'image/png');
    
    // Log current URL for debugging
    console.log('Current URL:', page.url());
    
    // Log page title
    console.log('Page Title:', await page.title());
  }
  
  await closeBrowser();
});