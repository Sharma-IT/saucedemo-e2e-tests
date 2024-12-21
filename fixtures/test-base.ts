import { test as base } from '@playwright/test';
import { Header } from '../page_objects/header';
import { LoginPage } from '../page_objects/login.page';
import { InventoryPage } from '../page_objects/inventory.page';
import { CheckoutPage } from '../page_objects/checkout.page';
import { CartPage } from '../page_objects/cart.page';
import { Sidebar } from '../page_objects/sidebar';

// Define fixture types
type Fixtures = {
    header: Header;
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    checkoutPage: CheckoutPage;
    cartPage: CartPage;
    sidebar: Sidebar;
};

// Extend base test with page objects
export const test = base.extend<Fixtures>({
    header: async ({ page }, use) => {
        await use(new Header(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    sidebar: async ({ page }, use) => {
        await use(new Sidebar(page));
    }
});
