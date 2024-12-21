import { Page, expect, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly cartList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartList = page.locator('[data-test="cart_list"]');
    }

    async verifyProductInCart(productName: string) {
        const productElement = this.page.locator('[data-test="inventory-item-name"]', {
            hasText: productName
        });
        await expect(productElement).toBeVisible();
    }

    async removeProductFromCart(productId: string) {
        await this.page.click(`[data-test="remove-${productId}"]`);
        await expect(this.cartBadge).not.toBeVisible();
    }

    async verifyNoProductInCart(productName: string) {
        const productElement = this.page.locator('[data-test="inventory-item-name"]', {
            hasText: productName
        });
        await expect(productElement).not.toBeVisible();
    }
}
