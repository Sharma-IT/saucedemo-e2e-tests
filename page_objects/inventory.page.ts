import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryContainer: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = page.locator('[data-test="inventory-container"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    // Note: addButton and priceElement locators are created within methods rather than constructor
    // because they depend on dynamic productId values that are only available at runtime
    async addProductToCart(productId: string) {
        await this.inventoryContainer.waitFor();
        const addButton = this.page.locator(`[data-test="add-to-cart-${productId}"]`);
        await addButton.waitFor({ state: 'visible' });
        await addButton.click();
        await expect(this.cartBadge).toHaveText('1');
    }

    async getProductPrice(productId: string): Promise<string> {
        const priceElement = this.page.locator(`[data-test="inventory-item"][data-id="${productId}"] .inventory_item_price`);
        return await priceElement.textContent() || '';
    }
}
