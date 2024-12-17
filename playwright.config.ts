import { PlaywrightTestConfig, devices } from '@playwright/test';
import path from 'path';

const baseURL = 'https://www.saucedemo.com';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  globalSetup: require.resolve('./config/global-setup'),
  globalTeardown: require.resolve('./config/global-teardown'),
  use: {
    baseURL,
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 15000,
    storageState: path.join(process.cwd(), 'test-results', 'auth.json')
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] }
    }
  ],
  outputDir: 'test-results/',
  forbidOnly: !!process.env.CI
};

export default config;
