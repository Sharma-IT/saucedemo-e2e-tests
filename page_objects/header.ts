import { Page, Locator } from '@playwright/test';
 
export class Header {
    readonly page: Page;
    readonly cartLink: Locator;
 
    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }
 
    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForURL(/cart.html/);
    }
}