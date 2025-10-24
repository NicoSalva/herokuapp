# 🧪 Herokuapp Test Suite

**Test automation suite for the Herokuapp application** using WebdriverIO, Cucumber, and Allure reporting. Designed for both manual testers and automation engineers.

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18+ (recommended v20)
- **Docker**: v24+ (optional, for containerized testing)
- **Git**: Latest version

### System Requirements
- **macOS**: 10.15+ (Intel/Apple Silicon)
- **Windows**: 10+ (with WSL2 recommended)
- **Linux**: Ubuntu 20.04+ or equivalent

### Verify Setup
```bash
# Check Node.js version
node --version  # Should be v18+

# Check Docker (optional)
docker --version  # Should be v24+

# Check Git
git --version
```

### Installation
```bash
# 1. Clone the repository
git clone <https://github.com/NicoSalva/herokuapp.git>
cd herokuapp

# 2. Install dependencies
npm install

# 3. Verify installation
npm run test:firefox
```

## 🎯 Running Tests

### Production Features
- **🔒 Locked Versions**: Deterministic builds with exact package versions
- **📄 .nvmrc**: Node.js v20 for consistent environments
- **🐳 Docker Optimized**: Faster builds with .dockerignore
- **⏱️ Smart Waits**: Healthchecks and wait scripts prevent "session not created" errors
- **🔄 Intelligent Retries**: Optimized retry configuration for stability
- **🚀 GitHub Actions**: Matrix testing with Chrome/Firefox + Headless/Visible + Tags

### Desktop Tests (Chrome/Firefox)
```bash
# Firefox (recommended)
npm run test:firefox

# Chrome
npm run test:chrome

# Mobile emulation
npm run test:mobile
```

### Docker Execution
```bash
# Start Selenium Grid (Intel/AMD64)
docker compose up -d

# Start Selenium Grid (Apple Silicon M1/M2)
docker compose -f docker-compose.arm64.yml up -d

# Wait for Selenium Grid to be ready
npm run docker:wait

# Run tests against Docker (Firefox only)
npm run test:docker

# Stop containers
docker compose down
```

## 🏷️ Running Tests by Tags

### Available Tags
- `@smoke` - Critical functionality tests (fast, ~2 min)
- `@functional` - Full feature tests (complete, ~10 min)
- `@bug` - Regression tests (specific issues)

### Tag Execution
```bash
# Run smoke tests (recommended for quick validation)
TAGS='@smoke' npm run test:firefox

# Run specific feature
SPEC='./dist/tests/features/create-item.feature' npm run test:firefox

# Run with multiple tags
TAGS='@smoke and @functional' npm run test:firefox
```

## 📊 Allure Reports

### Generate and View Reports
```bash
# Generate report
npm run allure:generate

# Open report in browser
npm run allure:open

# Clean old reports
npm run allure:clean
```

## ⚙️ Configuration & Scripts

### Main Scripts
- `npm run test` - Run all tests (default: Chrome)
- `npm run test:firefox` - Run with Firefox
- `npm run test:chrome` - Run with Chrome
- `npm run test:mobile` - Run mobile emulation
- `npm run test:docker` - Run in Docker with Firefox

### Environment Variables
- `BROWSER` - Browser to use (chrome/firefox)
- `HEADLESS` - Run headless mode (true/false, default: false for visible mode)
- `MOBILE` - Mobile emulation (true/false)
- `TAGS` - Cucumber tag expression
- `SPEC` - Specific feature file

## 🔍 Debugging & Visualization

### Browser Visibility
- Tests run in **visible mode by default** - you can see the browser executing tests
- This makes debugging easier and more intuitive
- Use `HEADLESS=true` for faster, background execution

### Screenshots
- Automatically captured on test failures
- Stored in `screenshots/` directory
- Attached to Allure reports

### Logs
- Detailed WebDriver logs in console
- Allure step-by-step execution logs
- Error traces with stack information

## 🐛 Troubleshooting

### Common Issues

**Docker not starting:**
```bash
# Check Docker status
docker ps

# Restart Docker Desktop
# Or run: docker compose up -d
```

**Tests failing locally:**
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install

# Check browser drivers
npm run test:firefox
```

**Allure reports empty:**
```bash
# Clean and regenerate
npm run allure:clean
npm run allure:generate
```

### Performance Tips
- Tests run in **visible mode** by default for better debugging
- Use `HEADLESS=true` for faster execution (no browser window)
- Run `@smoke` tests for quick validation
- Use Docker for consistent environments

## 🏗️ Project Structure

```
herokuapp/
├── config/                 # WebdriverIO configurations
│   ├── wdio.base.cjs      # Base configuration
│   ├── wdio.conf.cjs      # Local execution
│   └── wdio.docker.cjs    # Docker execution
├── tests/                  # Test files
│   ├── features/          # Gherkin feature files
│   └── step-definitions/  # Cucumber step definitions
├── src/                    # Page objects and utilities
│   ├── pages/             # Page Object Model
│   ├── locators/          # Element selectors
│   └── utils/             # Helper functions
├── dist/                   # Compiled TypeScript
├── allure-results/         # Allure test results
├── allure-report/          # Generated Allure reports
└── screenshots/            # Failure screenshots
```

## 🤝 Contributing

### For Manual Testers
1. **Feature Files**: Add new scenarios in `tests/features/`
2. **Step Definitions**: Implement steps in `tests/step-definitions/`
3. **Page Objects**: Create page classes in `src/pages/`
4. **Tags**: Use appropriate tags (`@smoke`, `@functional`, `@bug`)

### For Developers
1. **Configuration**: Modify `config/wdio.*.cjs` files
2. **Utilities**: Add helper functions in `src/utils/`
3. **Locators**: Update selectors in `src/locators/`

## 📚 BDD Approach for Manual Testers

This project uses **Behavior-Driven Development (BDD)** with Gherkin syntax, making it accessible for manual testers:

### Gherkin Features
- **Given/When/Then** structure for clear test scenarios
- **Natural language** that describes business behavior
- **Reusable steps** across different test cases

### Step Definitions
- **Page Object Model** for maintainable selectors
- **AllureLogger** for detailed execution reports
- **Helper utilities** for common operations

### Example Test Flow
```gherkin
Given I am on the Stranger List application
When I enter "Test item" in the description field
And I upload an image file
And I click the Create Item button
Then the item count should increase by 1
And I should see the new item in the list
```

## 🚀 Advanced Usage

### Custom Configurations
```bash
# Run with headless mode (faster, no browser window)
BROWSER=firefox HEADLESS=true npm run test

# Run specific scenarios
TAGS='@smoke and not @bug' npm run test:firefox

# Run with mobile emulation
MOBILE=true npm run test:chrome
```

### CI/CD Integration

#### GitHub Actions
The project includes automated testing via GitHub Actions with:

- **Matrix Testing**: Chrome/Firefox + Headless/Visible + Tags
- **Docker Testing**: Selenium Grid with Firefox
- **Allure Reports**: Generated as artifacts (30-day retention)
- **Deterministic Builds**: Using `npm ci` and locked versions

#### Local CI Simulation
```bash
# Install dependencies (deterministic)
npm ci

# Run smoke tests
TAGS='@smoke' npm run test:firefox

# Run with specific browser and headless mode
BROWSER=chrome HEADLESS=true TAGS='@functional' npm run test

# Generate reports
npm run allure:generate
```

## 📞 Support

For questions or issues:
1. Check the **Troubleshooting** section above
2. Review **Allure reports** for detailed execution logs
3. Check **screenshots** for visual debugging
4. Consult the **Project Structure** for file organization