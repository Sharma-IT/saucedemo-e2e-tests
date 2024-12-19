export const TEST_USERS = {
    STANDARD: {
        username: process.env.STANDARD_USER_USERNAME || '',
        password: process.env.STANDARD_USER_PASSWORD || ''
    },
    LOCKED: {
        username: process.env.LOCKED_USER_USERNAME || '',
        password: process.env.LOCKED_USER_PASSWORD || ''
    }
} as const;

// Validate environment variables
Object.entries(TEST_USERS).forEach(([userType, credentials]) => {
    if (!credentials.username || !credentials.password) {
        throw new Error(`Missing environment variables for ${userType} user. Please check your .env file.`);
    }
});

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
