import fs from 'fs';
import path from 'path';

async function globalTeardown() {

    // Get test results directory size
    const testResultsDir = path.join(process.cwd(), 'test-results');

    console.log('\nGlobal Teardown:\n');
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Test Run Ended:', new Date().toLocaleString());
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
