export const TEST_USERS = {
    STANDARD: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    LOCKED: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    }
} as const;

export const PRODUCTS = {
    BACKPACK: {
        id: 'sauce-labs-backpack',
        name: 'Sauce Labs Backpack'
    },
    BIKE_LIGHT: {
        id: 'sauce-labs-bike-light',
        name: 'Sauce Labs Bike Light'
    }
} as const;

export const TEST_USER_INFO = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
} as const;
