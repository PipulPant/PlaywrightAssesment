# SauceDemo Automation

This is a high-speed automation project for SauceDemo, optimized for modern CI environments. It uses a "Hybrid" approach, bypassing the login page via programmatic session injection to maximize execution speed.

## Quick Start

### 1. Install dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 2. Run the tests
You don't need to manually set up sessions; the suite handles it automatically via Playwright setup projects.

```bash
# Main execution (Headless)
yarn run:ui:test

# Interactive mode (Headed with UI)
yarn open:ui:test

# View the last test report
yarn report
```

## Architecture & Decisions

I've focused on keeping the code resilient and human-readable:
- **Resilient Selectors**: We use `data-test` attributes wherever possible to avoid breakage from UI changes.
- **POM Pattern**: All page-specific logic is isolated in the `pages/` directory.
- **Session Injection**: We capture the `session-username` cookie once and inject it into all tests, skipping the expensive login UI.
- **API Mocking**: Includes tests to verify how the UI handles 500 server errors and network timeouts.

## Project Documentation
For a deeper dive into the technical details, see:
- [TEST_STRATEGY.md](./TEST_STRATEGY.md): Why Playwright and how the hybrid approach works.
- [CHECKOUT_PLAN.md](./CHECKOUT_PLAN.md): The step-by-step logic for the checkout journey.
- [PROGRAMMATIC_LOGIN.md](./PROGRAMMATIC_LOGIN.md): Breakdown of the session reverse-engineering.
- [WALKTHROUGH_GUIDE.md](./WALKTHROUGH_GUIDE.md): Script for the 5-minute video presentation.

## Success Criteria
All tests are configured to run in parallel. A successful run should show 8 functional tests passing (plus the background auth setup).
# PlaywrightAssesment
