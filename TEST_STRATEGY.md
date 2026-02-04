# Test Strategy

## Framework: Playwright
I went with Playwright/JS. It's built for modern CI, handles parallelization natively, and the auto-waiting prevents most of the flaky timing issues seen in older frameworks.

## The Hybrid Approach (Anti-Cheat)
The requirement was to skip UI login for main tests.

**Rewards:**
- **Speed**: Saves ~3 seconds per test run.
- **Isolation**: Functional tests focus on the checkout flow, not the login form.

**Risks:**
- We skip testing the login UI in every individual spec.
- **Mitigation**: I added a dedicated `setup` project that performs one full UI login to verify the auth gate.

## Architecture
- **POM**: All selectors and actions are in the `pages/` folder.
- **Fixtures**: Using Playwright fixtures to inject page objects into tests. No `new Page()` boilerplate in specs.
- **Test Data**: Hardcoded values reside in `fixtures/testData.js`.

## Senior X-Factor (Option B)
I implemented network interception in `tests/api-mocking.spec.js`. It catches a background telemetry call and forces a 500 error during the "Add to Cart" action. This verifies the UI doesn't crash even if a supporting service fails.
