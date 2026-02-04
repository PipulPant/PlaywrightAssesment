import { test, expect } from '../fixtures/fixtures';

test.describe('Performance', () => {
  test('interactivity check', async ({ inventoryPage, page }) => {
    const start = Date.now();

    await inventoryPage.goto();

    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      inventoryPage.inventoryList.waitFor({ state: 'visible' }),
    ]);

    // must be clickable
    await expect(inventoryPage.backpackAddButton).toBeEnabled();

    const took = (Date.now() - start) / 1000;
    console.log(`page ready in ${took}s`);

    // fail if over 2s
    expect(took).toBeLessThan(2.0);
  });
});
