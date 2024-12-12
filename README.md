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

## Project Structure

```
saucedemo-e2e-tests/
├── tests/                # Test files
├── pages/                # Page Object Models
├── fixtures/             # Test fixtures and data
├── test-results/         # Test execution results
├── playwright.config.ts  # Playwright configuration
├── global-setup.ts       # Global test setup
└── docs/                 # Documentation files
    ├── assumptions.md    # Detailed assumptions
    └── license.md        # Project license information
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

## CI/CD Integration

The test suite is configured for CI/CD environments with:
- Single worker execution in CI
- Mandatory retries for stability
- JUnit report generation
- Failure artifacts (screenshots, videos, traces)
- No focus mode in CI (forbidOnly)

## Assumptions and Documentation

For a comprehensive list of assumptions, testing constraints, and project considerations, please refer to the [detailed assumptions document](/docs/assumptions.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.