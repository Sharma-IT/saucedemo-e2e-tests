import { FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalTeardown(config: FullConfig) {
    // Clean up authentication state
    const authFile = path.join(process.cwd(), 'test-results', 'auth.json');
    if (fs.existsSync(authFile)) {
        fs.unlinkSync(authFile);
    }

    // Clean up any temporary test data
    const testDataDir = path.join(process.cwd(), 'test-results', 'test-data');
    if (fs.existsSync(testDataDir)) {
        fs.rmSync(testDataDir, { recursive: true, force: true });
    }

    console.log('Global teardown completed successfully');
}

export default globalTeardown;
