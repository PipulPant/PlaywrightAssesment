import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE_USER_PATH } from '../fixtures/envHelper';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import fs from 'fs';

const authFile = STORAGE_STATE_USER_PATH;

/**
 * Basic check to see if storage state is still valid
 */
function isValidStorageState(storageState) {
  if (!storageState || !storageState.cookies || storageState.cookies.length === 0) {
    return false;
  }

  // Look for the specific SauceDemo session cookie
  const sessionCookie = storageState.cookies.find(c => c.name === 'session-username');
  if (!sessionCookie) return false;

  const now = Date.now() / 1000;
  if (sessionCookie.expires && sessionCookie.expires !== -1 && sessionCookie.expires < now) {
    return false;
  }

  return true;
}

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  const username = process.env.SAUCEDEMO_USERNAME || 'standard_user';
  const password = process.env.SAUCEDEMO_PASSWORD || 'secret_sauce';

  // Use existing storage state if valid to save time
  if (!process.env.CI) {
    if (fs.existsSync(authFile)) {
      try {
        const storageState = JSON.parse(fs.readFileSync(authFile, 'utf-8'));
        if (isValidStorageState(storageState)) {
          console.log('Valid storage state found. Skipping auth setup.');
          return;
        }
      } catch (error) {
        console.log('Storage state expired or invalid. Re-authenticating...');
      }
    }
  }

  console.log('Starting authentication for SauceDemo...');

  try {
    await loginPage.goto();

    console.log(`Logging in as: ${username}`);
    await loginPage.login(username, password);

    // Wait for inventory page to load
    await page.waitForURL('**/inventory.html', { timeout: 10000 });

    // Verify we actually landed on the inventory page
    await expect(inventoryPage.inventoryList).toBeVisible({ timeout: 5000 });
    console.log('Login successful, inventory page visible');

    // Save session
    await page.context().storageState({ path: authFile });
    console.log('Storage state saved');

    // Quick verification check
    console.log('Verifying storage state works...');
    const testContext = await page.context().browser().newContext({ storageState: authFile });
    const testPage = await testContext.newPage();
    await testPage.goto('/inventory.html');

    if (testPage.url().includes('/inventory.html')) {
      console.log('Storage state verification successful');
    } else {
      console.log('Warning: Storage state verification failed');
    }

    await testContext.close();
    console.log('Authentication setup complete');

  } catch (error) {
    console.error('Authentication failed:', error.message);
    throw error;
  }
});
