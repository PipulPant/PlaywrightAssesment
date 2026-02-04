import { test, expect } from '../fixtures/fixtures';
import { testData } from '../fixtures/testData';

test.describe('Visuals', () => {
  test('button color changes on click', async ({ inventoryPage }) => {
    await inventoryPage.goto();

    const btn = inventoryPage.backpackAddButton;

    // get initial color
    const oldColor = await btn.evaluate((el) => window.getComputedStyle(el).color);

    await inventoryPage.addBackpackToCart();

    const removeBtn = inventoryPage.backpackRemoveButton;
    await expect(removeBtn).toHaveText(testData.visuals.removeButtonText);

    // check color shift
    const newColor = await removeBtn.evaluate((el) => window.getComputedStyle(el).color);
    expect(newColor).not.toBe(oldColor);
    expect(newColor).toBe(testData.visuals.removeButtonColor);
  });

  test('state remains after reload', async ({ inventoryPage, page }) => {
    await inventoryPage.goto();
    await inventoryPage.addBackpackToCart();

    await page.reload();
    await expect(inventoryPage.backpackRemoveButton).toBeVisible();
  });
});
