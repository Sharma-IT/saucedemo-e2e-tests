import { FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { TestState } from './test-state';

async function globalTeardown(config: FullConfig) {
    // Calculate test duration
    const testEndTime = Date.now();
    const duration = (testEndTime - TestState.getInstance().getStartTime()) / 1000;

    // Get test results directory size
    const testResultsDir = path.join(process.cwd(), 'test-results');

    console.log('\nGlobal Teardown:\n');
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Test Run Ended:', new Date().toLocaleString());
    console.log('Total Test Duration:', duration.toFixed(2) + 's');
    console.log('-'.repeat(40));

    // Clean up authentication state
    const authFile = path.join(testResultsDir, 'auth.json');
    if (fs.existsSync(authFile)) {
        fs.unlinkSync(authFile);
    }

    // Clean up any temporary test data
    const testDataDir = path.join(process.cwd(), 'test-results', 'test-data');
    if (fs.existsSync(testDataDir)) {
        fs.rmSync(testDataDir, { recursive: true, force: true });
    }

    console.log('\nGlobal teardown completed successfully');
}

export default globalTeardown;
