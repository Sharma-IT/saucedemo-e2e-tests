import { chromium, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/login.page';
import { TEST_USERS } from '../fixtures/test-data';
import fs from 'fs';
import path from 'path';
import { TestState } from './test-state';

// Load environment variables from .env file
dotenv.config();

// Initialise test state
TestState.getInstance().reset();

async function globalSetup(config: FullConfig) {
    const baseURL = 'https://www.saucedemo.com';

    // Print test configuration
    console.log('Test Configuration:\n');
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Workers:', config.workers);
    console.log('Base URL:', baseURL);
    console.log('Test Run Started:', new Date().toLocaleString());
    console.log('-'.repeat(41));

    // Ensure test results directory exists
    const testResultsDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(testResultsDir)) {
        fs.mkdirSync(testResultsDir, { recursive: true });
    }

    // Setup authentication state
    const browser = await chromium.launch();
    const context = await browser.newContext({
        baseURL: baseURL
    });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_USERS.STANDARD.username, TEST_USERS.STANDARD.password);
    await context.storageState({ path: path.join(testResultsDir, 'auth.json') });
    await browser.close();
}

export default globalSetup;
