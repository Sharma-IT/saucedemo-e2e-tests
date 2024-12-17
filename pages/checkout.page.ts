import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
    }

    async fillInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
        await this.page.waitForURL(/checkout-step-two.html/);
    }

    async completeOrder() {
        await this.finishButton.click();
        await this.page.waitForURL(/checkout-complete.html/);
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
    }

    async startCheckout() {
        await this.page.click('[data-test="checkout"]');
    }
}
