# Saucedemo E2E Tests

End-to-end test suite for the Saucedemo website using Playwright and TypeScript.

## Features

- Page Object Model (POM) architecture for better maintainability
- Cross-browser testing support (Chrome, Firefox, Safari)
- Mobile device testing support (Pixel 5, iPhone 12)
- Comprehensive test reporting (HTML, List, JUnit)
- CI/CD ready configuration
- Automatic retries for flaky tests
- Screenshot and video capture on test failure
- Trace viewer support for debugging
- State management with authentication persistence
- Parallel test execution with sharding

## Project Structure

```
saucedemo-e2e-tests/
├── tests/                       # Test files
│   └── purchase-flow.spec.ts    # E2E tests for purchase flow
├── pages/                       # Page Object Models
│   ├── login.page.ts            # Login page interactions
│   ├── inventory.page.ts        # Inventory page interactions
│   └── checkout.page.ts         # Checkout page interactions
├── fixtures/                    # Test fixtures and data
│   ├── test-base.ts             # Base test configuration and fixtures
│   └── test-data.ts             # Test data constants
├── config/                      # Configuration files
│   ├── global-setup.ts          # Global test setup
│   └── global-teardown.ts       # Global test teardown
├── playwright.config.ts         # Playwright configuration
├── README.md                    # Project documentation
└── docs/                        # Documentation files
    ├── assumptions.md           # Detailed assumptions
    └── license.md               # Project license information
```

## Getting Started

1. Clone this repository:

```bash
git clone https://github.com/Sharma-IT/saucedemo-e2e-tests.git
```

2. Change into this repository's directory:

```bash
cd saucedemo-e2e-tests
```

3. Install dependencies:

```bash
npm install
```

4. Install browsers:

```bash
npm prepare
```

5. Run tests:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# View test report
npm run test:report
```

## Test Coverage

- Login functionality
  - Standard user login
  - Locked out user error handling
- Product purchase flow
  - Adding products to cart
  - Checkout process
  - Order confirmation
- Cart functionality
  - Adding/removing items
  - Cart badge updates

## Configuration

The test suite is configured with:

- Base URL: https://www.saucedemo.com
- Browser support:
  - Desktop: Chrome, Firefox, Safari
  - Mobile: Pixel 5, iPhone 12
- Test retries: 2 attempts
- Timeouts:
  - Global: 30 seconds
  - Action: 15 seconds
  - Navigation: 15 seconds
- Test artifacts:
  - Screenshots on failure
  - Videos on failure
  - Trace viewer support
- Authentication state persistence
- Parallel execution with test sharding

## CI/CD Integration

The test suite is configured for CI/CD environments with:
- Runs on Node.js 20 on Ubuntu latest
- Parallel test execution:
  - 3-way sharding for optimal distribution
  - Fail-fast disabled for complete test visibility
  - Current distribution: 6/6/3 tests per shard
- Test reporting per shard:
  - JUnit XML reports with passed test inclusion
  - Detailed test summaries
  - Individual shard test reports
- Development safeguards:
  - No focus mode in CI (forbidOnly)
  - Automatic retries (2 attempts)
- Performance optimisations:
  - npm dependency caching
  - Playwright browser caching

## Assumptions and Documentation

For a comprehensive list of assumptions, testing constraints, and project considerations, please refer to the [detailed assumptions document](/docs/assumptions.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
