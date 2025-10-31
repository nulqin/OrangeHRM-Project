import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

// Launch browser with maximized window
export async function launchBrowser(): Promise<void> {
  browser = await chromium.launch({
    headless: false, // set true to run in headless mode
    args: ['--start-maximized'],
  });
  context = await browser.newContext({
    viewport: null, // use full screen size
  });
  page = await context.newPage();
}

// Close all browser instances
export async function closeBrowser(): Promise<void> {
  await page.close();
  await context.close();
  await browser.close();
}

// Get the active page instance for use in tests
export function getPage(): Page {
  return page;
}
