import { Page, Locator } from '@playwright/test';

export class Sidebar {
    readonly page: Page;
    readonly burgerMenuButton: Locator;
    readonly logoutSidebarLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.burgerMenuButton = page.locator('[id="react-burger-menu-btn"]');
        this.logoutSidebarLink = page.locator('[data-test="logout-sidebar-link"]');
    };

    async logout() {
        await this.burgerMenuButton.click();
        await this.logoutSidebarLink.click();
    }
}