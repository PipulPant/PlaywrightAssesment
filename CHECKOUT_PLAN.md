# Checkout Flow - QA Test Plan

This is my plan for testing the checkout process. I want to make sure a user can get from the product list to the "order complete" page without any blockers.

## What's in scope?
I'm focusing on the main path: logging in (via session), adding a product, filling in the shipping info, and confirming the order.

## Scenarios

### 1. The Standard "Happy Path"
- **Setup**: Start on the products page (bypass login using the cookie).
- **Steps**:
  - Add the "Sauce Labs Backpack" to the cart.
  - Open the cart and verify the backpack is listed.
  - Hit checkout and enter dummy info (Name, Zip).
  - Review the total on the summary page.
  - Click Finish.
- **Pass if**: I see the "Thank you for your order" message and the URL is `checkout-complete.html`.

### 2. Cart Counting
- Just a quick check to ensure that if I add two items, the little cart icon actually shows "2".

## My Selector Strategy
I'm sticking to `data-test` IDs provided by the developers. They are way more reliable than CSS classes or XPaths which tend to break as soon as the design changes.

## Verification
The test is successful if the order goes through and we don't see any console errors or broken links along the way.
