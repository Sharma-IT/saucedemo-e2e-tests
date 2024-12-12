import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { TEST_USERS } from './test-data';

// Define custom fixture types
export type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  authenticatedPage: { page: any; context: any };
};

// Extend base test with custom fixtures
export const test = base.extend<TestFixtures>({
  // Setup for loginPage
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Setup for inventoryPage
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  // Setup for authenticated state
  authenticatedPage: async ({ browser }, use) => {
    // Create a new context for isolation
    const context = await browser.newContext({
      baseURL: 'https://www.saucedemo.com'
    });
    const page = await context.newPage();

    // Perform login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password);

    // Store authentication state
    await context.storageState({ path: './test-results/auth.json' });

    // Make authenticated page available to test
    await use({ page, context });

    // Cleanup after test
    await context.close();
  }
});
