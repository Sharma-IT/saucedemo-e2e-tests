import { test } from '../fixtures/test-base';
import { TEST_USERS, PRODUCTS, TEST_USER_INFO } from '../fixtures/test-data';

test.describe('Saucedemo Product Purchase Flow', () => {
  test.beforeEach(async ({ page, header, inventoryPage }, testInfo) => {
    if (testInfo.title !== 'Error handling of locked out user') {
      await page.goto('/inventory.html');
      await inventoryPage.addProductToCart(PRODUCTS.BACKPACK.id);
      await header.goToCart();
    }
  });

  test('Product purchase', async ({ header, cartPage, checkoutPage }) => {
    // 1. Navigate to the checkout page
    // 2. Add product to cart
    // 3. Go to the cart page
    
    // 4. Verify product in cart
    await cartPage.verifyProductInCart(PRODUCTS.BACKPACK.name);

    // 5. Complete checkout
    await checkoutPage.startCheckout();
    await checkoutPage.fillInformation(
      TEST_USER_INFO.firstName,
      TEST_USER_INFO.lastName,
      TEST_USER_INFO.postalCode
    );
    await checkoutPage.completeOrder();

    // 6. Check cart is empty
    await header.goToCart();
    await cartPage.verifyNoProductInCart(PRODUCTS.BACKPACK.name);
  });

  test('Cart functionality', async ({ cartPage }) => {
    // 1. Navigate to the checkout page
    // 2. Add product to cart
    // 3. Go to the cart page

    // 4. Remove product from cart:
    await cartPage.removeProductFromCart(PRODUCTS.BACKPACK.id);
  });

  test('Error handling of locked out user', async ({ loginPage }) => {    
    // 1. Navigate to the login page,
    // 2. Enter locked out user credentials,
    // 3. Click login button,
    // 4. Verify error message:
    await loginPage.verifyLockedOutUser(TEST_USERS.LOCKED.username, TEST_USERS.LOCKED.password);
  });

  test('Cart state persistence between logged-in and logged-out sessions', async ({ sidebar, loginPage, cartPage }) => {
    // 1. Navigate to the checkout page
    // 2. Add product to cart
    // 3. Go to the cart page
    
    // 4. Verify product in cart:
    await cartPage.verifyProductInCart(PRODUCTS.BACKPACK.name);

    // 5. Log out:
    await sidebar.logout();

    // 6. Login again:
    await loginPage.login(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password);

    // 7. Verify product is still in cart:
    await cartPage.verifyProductInCart(PRODUCTS.BACKPACK.name);
  });
});
