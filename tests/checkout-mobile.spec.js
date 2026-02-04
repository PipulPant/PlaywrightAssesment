import { test, expect } from '../fixtures/fixtures';
import { testData } from '../fixtures/testData';

test.describe('Mobile Checkout', () => {
  // set mobile viewport
  test.use({
    viewport: testData.mobile.viewport,
    userAgent: testData.mobile.userAgent,
  });

  test('checkout on mobile', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await inventoryPage.goto();

    // confirm mobile view dimensions
    const size = page.viewportSize();
    expect(size?.width).toBe(testData.mobile.viewport.width);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();

    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation(
      testData.user.firstName,
      testData.user.lastName,
      testData.user.postalCode
    );

    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
  });
});
