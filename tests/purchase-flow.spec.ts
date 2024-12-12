import { expect } from '@playwright/test';
import { test } from '../fixtures/test-base';
import { TEST_USERS, PRODUCTS, TEST_USER_INFO } from '../fixtures/test-data';

test.describe('Saucedemo Product Purchase Flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password);
  });

  test('Complete a successful product purchase', async ({ page, inventoryPage }) => {
    await test.step('Add product to cart', async () => {
      await inventoryPage.inventoryContainer.waitFor();
      await inventoryPage.addProductToCart(PRODUCTS.BACKPACK.id);
      await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    await test.step('Complete checkout process', async () => {
      await inventoryPage.goToCart();
      await page.click('[data-test="checkout"]');
      
      // Fill checkout information
      await page.fill('[data-test="firstName"]', TEST_USER_INFO.firstName);
      await page.fill('[data-test="lastName"]', TEST_USER_INFO.lastName);
      await page.fill('[data-test="postalCode"]', TEST_USER_INFO.postalCode);
      await page.click('[data-test="continue"]');
      
      await page.waitForURL(/checkout-step-two.html/);
      await page.click('[data-test="finish"]');
      
      // Verify order completion
      await page.waitForURL(/checkout-complete.html/);
      await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    });
  });

  test('Verify cart functionality', async ({ inventoryPage }) => {
    await test.step('Add and verify product in cart', async () => {
      await inventoryPage.inventoryContainer.waitFor();
      await inventoryPage.addProductToCart(PRODUCTS.BACKPACK.id);
      await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    await test.step('Remove product and verify empty cart', async () => {
      await inventoryPage.goToCart();
      await inventoryPage.page.click(`[data-test="remove-${PRODUCTS.BACKPACK.id}"]`);
      await expect(inventoryPage.cartBadge).toHaveCount(0);
    });
  });

  test('Verify error for locked out user', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.usernameInput.fill(TEST_USERS.LOCKED.username);
    await loginPage.passwordInput.fill(TEST_USERS.LOCKED.password);
    await loginPage.loginButton.click();
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out');
  });
});
