import { test, expect } from '../fixtures/fixtures';

test.describe('API Mocking', () => {
  test('handle 500 error on add to cart', async ({ page, inventoryPage }) => {
    let fired = false;

    // catch telemetry call and fail it
    await page.route('**/backtrace.io/**', async (route) => {
      fired = true;
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'fail' })
      });
    });

    await inventoryPage.goto();
    await inventoryPage.addBackpackToCart();

    // ui should stay up even if background call fails
    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(inventoryPage.backpackRemoveButton).toBeVisible();

    if (fired) console.log('mock worked');
  });
});
