import { test } from '../fixtures/test-base';
import { TEST_USERS, PRODUCTS, TEST_USER_INFO } from '../fixtures/test-data';

test.describe('Saucedemo Product Purchase Flow', () => {
  test.beforeEach(async ({ page, inventoryPage }, testInfo) => {
    if (testInfo.title !== 'Verify error for locked out user') {
      await page.goto('/inventory.html');
      await inventoryPage.addProductToCart(PRODUCTS.BACKPACK.id);
      await inventoryPage.goToCart();
    }
  });

  test('Complete a successful product purchase', async ({ checkoutPage }) => {
    // 1. Navigate to the checkout page
    // 2. Add product to cart
    // 3. Go to the cart page

    // 4. Complete checkout:
    await checkoutPage.startCheckout();
    await checkoutPage.fillInformation(
      TEST_USER_INFO.firstName,
      TEST_USER_INFO.lastName,
      TEST_USER_INFO.postalCode
    );
    await checkoutPage.completeOrder();
  });

  test('Verify cart functionality', async ({ inventoryPage }) => {
    // 1. Navigate to the checkout page
    // 2. Add product to cart
    // 3. Go to the cart page

    // 4. Remove product from cart:
    await inventoryPage.removeProductFromCart(PRODUCTS.BACKPACK.id);
  });

  test('Verify error for locked out user', async ({ loginPage }) => {    
    // 1. Navigate to the login page,
    // 2. Enter locked out user credentials,
    // 3. Click login button,
    // 4. Verify error message:
    await loginPage.verifyLockedOutUser(TEST_USERS.LOCKED.username, TEST_USERS.LOCKED.password);
  });
});
