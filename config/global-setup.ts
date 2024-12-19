import { chromium, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/login.page';
import { TEST_USERS } from '../fixtures/test-data';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

async function globalSetup(config: FullConfig) {
    // Ensure test results directory exists
    const testResultsDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(testResultsDir)) {
        fs.mkdirSync(testResultsDir, { recursive: true });
    }

    // Setup authentication state
    const browser = await chromium.launch();
    const context = await browser.newContext({
        baseURL: 'https://www.saucedemo.com'
    });
    const page = await context.newPage();

    // Login and save authentication state
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password);
    
    // Store authentication state for reuse
    await context.storageState({
        path: path.join(testResultsDir, 'auth.json')
    });

    await browser.close();

    console.log('Global setup completed successfully');
}

export default globalSetup;
