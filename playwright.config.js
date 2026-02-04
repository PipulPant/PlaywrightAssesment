import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load env variables
dotenv.config();

// Path where the session state is stored
const STORAGE_STATE = path.join(process.cwd(), 'playwright/.auth/userState.json');

export default defineConfig({
  testDir: './',
  fullyParallel: true,
  // Fail on CI if you accidentally leave test.only in the code
  forbidOnly: !!process.env.CI,
  // Retry once on CI
  retries: process.env.CI ? 2 : 0,
  // Control concurrency
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
    // Use data-test for stable selectors
    testIdAttribute: 'data-test',
  },

  timeout: 60000,

  projects: [
    // Project to handle the initial login and session creation
    {
      name: 'setup',
      testMatch: /base\/auth\.js/,
    },

    // Main execution projects
    {
      name: 'chromium',
      testMatch: /tests\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      testMatch: /tests\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Firefox'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      testMatch: /tests\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Safari'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },

    // Mobile viewport tests
    {
      name: 'Mobile Chrome',
      testMatch: /tests\/.*\.spec\.js/,
      use: {
        ...devices['Pixel 5'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
    {
      name: 'Mobile Safari',
      testMatch: /tests\/.*\.spec\.js/,
      use: {
        ...devices['iPhone 12'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
  ],
});
