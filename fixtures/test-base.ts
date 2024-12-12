import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

// Declare the types of fixtures
type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
};

// Extend the base test with fixtures
export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    }
});
