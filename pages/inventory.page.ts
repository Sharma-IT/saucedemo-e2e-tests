import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryContainer: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = page.locator('[data-test="inventory-container"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async addProductToCart(productId: string) {
        const addButton = this.page.locator(`[data-test="add-to-cart-${productId}"]`);
        await addButton.waitFor({ state: 'visible' });
        await addButton.click();
    }

    async getProductPrice(productId: string): Promise<string> {
        const priceElement = this.page.locator(`[data-test="inventory-item"][data-id="${productId}"] .inventory_item_price`);
        return await priceElement.textContent() || '';
    }

    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForURL(/cart.html/);
    }
}
