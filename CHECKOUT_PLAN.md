# Checkout Flow Test Strategy & Plan

**Author**: QA Engineering
**Component**: Checkout / E2E
**Status**: Draft

## 1. Overview & Objectives
The goal of this test plan is to verify the stability and correctness of the "Checkout Flow" on SauceDemo. This is the most critical path for the application, directly impacting conversion.

We are focusing on:
- **Functionality**: Can a user actually buy something?
- **Data Integrity**: Are prices, taxes, and totals calculated correctly?
- **User Experience**: Do error messages appear when they should? Does the cart update instantly?

## 2. Test Strategy

### Selector Priority
We will prioritize stability by using `data-test` attributes provided by developers.
*   **Good**: `data-test="add-to-cart-sauce-labs-backpack"`
*   **Avoid**: complex XPaths or fragile CSS classes like `.btn_primary` which may change with styling updates.

### Coverage Approach
1.  **Smoke / Happy Path**: Verify the standard flow works first. If this fails, block the release.
2.  **Negative Testing**: Verify form validations (empty fields, bad data) only after the happy path is stable.
3.  **State Management**: Ensure the cart retains state during navigation but clears correctly after purchase.

## 3. Scope

### In Scope
- **Inventory**: Adding/Removing items, Sorting integrity.
- **Cart**: Badge updates, Item persistence.
- **Checkout**: Form filling, Validation, Overview calculations.
- **Completion**: Order success state.

### Out of Scope (for now)
- Performance / Load testing.
- Third-party payment gateway integration (mocked).
- Visual regression (unless layout is totally broken).

## 4. Test Scenarios

### Scenario A: The "Happy Path" (Smoke Test)
**Goal**: Verify a user can purchase a single item without issues.
1.  **Login** with `standard_user`.
2.  **Add** "Sauce Labs Backpack" to cart.
3.  **Navigate** to Cart -> Checkout.
4.  **Fill** Information (Name: "Standard", Last: "User", Zip: "12345").
5.  **Verify** specific item is in the Overview.
6.  **Confirm** logic: Item Total + Tax = Total.
7.  **Finish**. Verify "Thank you for your order" and dispatch/complete URL.

### Scenario B: Cart Logic & Icon Integrity
**Goal**: Ensure the cart badge reflects reality.
1.  Add 1 item -> Badge "1".
2.  Add another -> Badge "2".
3.  Remove one from Inventory page -> Badge "1".
4.  Remove one from Cart page -> Badge empty/hidden.

### Scenario C: Form Validation (Negative Testing)
**Goal**: Ensure users cannot proceed with incomplete data.
1.  Go to Checkout Step One.
2.  Try "Continue" with all empty fields -> Expect "Error: First Name is required".
3.  Fill Name, leave Zip empty -> Expect "Error: Postal Code is required".

### Scenario D: Sorting & State
**Goal**: Ensure sorting doesn't mix up products.
1.  Sort by "Price (low to high)".
2.  Add the first item (should be "Sauce Labs Onesie").
3.  Verify the mapped item in the cart is indeed the Onesie, not the Backpack (which was first initially).

### Scenario E: Checkout Calculation
**Goal**: Verify math.
1.  Add item priced $29.99.
2.  Check Tax (assume 8% or fixed logic).
3.  Verify `Total` displayed matches `Item Total + Tax` exactly.

## 5. Risks
- **Flakiness**: Cart state might persist if `Reset App State` isn't called between tests.
- **Mitigation**: We will ensure a `beforeEach` or `afterEach` hook resets the app state to guarantee a clean slate for every test.
