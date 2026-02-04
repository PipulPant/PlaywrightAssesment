import { test, expect } from '../fixtures/fixtures';
import { testData } from '../fixtures/testData';

test.describe('Checkout Flow', () => {
  test('complete checkout flow', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await inventoryPage.goto();

    // check we are logged in
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.inventoryList).toBeVisible();

    // add product
    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.backpackRemoveButton).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // go to cart
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.getByText(testData.products.backpack)).toBeVisible();

    // start checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // fill form
    await checkoutPage.fillInformation(
      testData.user.firstName,
      testData.user.lastName,
      testData.user.postalCode
    );

    // review step
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(page.getByText(testData.products.backpack)).toBeVisible();

    // finish
    await checkoutPage.finishCheckout();

    // check success
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(checkoutPage.completeHeader).toHaveText(/thank you for your order!/i);
    await expect(checkoutPage.backToProductsButton).toBeVisible();
  });

  test('cart count updates', async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.backpackAddButton.click();
    await inventoryPage.getAddButtonByProductName(testData.products.bikeLight).click();
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });
});
