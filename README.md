# Stranger List - Test Suite

Automated test suite for the Stranger List application using WebdriverIO, TypeScript, and Cucumber.

## 🚀 Quick Start

### Prerequisites

**Required Software:**
- Node.js 18+ ([Download here](https://nodejs.org/))
- Docker Desktop ([Download here](https://www.docker.com/products/docker-desktop/))
- Git ([Download here](https://git-scm.com/))

**System Requirements:**
- **macOS**: 10.15+ (Catalina or newer)
- **Windows**: Windows 10+ (64-bit)
- **Linux**: Ubuntu 18.04+ or equivalent
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 2GB free space

**Verify Installation:**
```bash
node --version    # Should show v18+ 
docker --version  # Should show Docker version
git --version     # Should show Git version
```

### Step-by-Step Installation

**1. Clone the Repository**
```bash
git clone <repository-url>
cd herokuapp
```

**2. Install Dependencies**
```bash
npm install
```

**3. Verify Setup**
```bash
# Test local Chrome
BROWSER=chrome HEADLESS=true npm run test

# Test local Firefox  
BROWSER=firefox HEADLESS=true npm run test

# Test local Mobile
MOBILE=true npm run test
```

**4. Test Docker (Optional)**
```bash
# Test Docker (Desktop + Mobile)
docker-compose up --build test
```

## 🖥️ Local Execution

### Basic Test Execution
```bash
# Chrome (default)
BROWSER=chrome HEADLESS=true npm run test

# Firefox
BROWSER=firefox HEADLESS=true npm run test

# Mobile emulation
MOBILE=true npm run test

# Specific feature file
SPEC=./tests/features/create-item.feature npm run test
```

### Using Predefined Scripts
```bash
# Chrome tests
npm run test:chrome

# Firefox tests  
npm run test:firefox

# Mobile tests
npm run test:mobile

# Docker tests
npm run test:docker
```

### Running Tests by Tags
```bash
# Single tags
TAGS='@smoke' npm run test:chrome
TAGS='@functional' npm run test:firefox
TAGS='@bug-detection' npm run test:mobile

# Logical expressions
TAGS='@smoke and not @bug-detection' npm run test:chrome
TAGS='@functional or @validation' npm run test:firefox
TAGS='@edit and not @delete' npm run test:chrome

# Multiple combinations
TAGS='@smoke' BROWSER=firefox npm run test
TAGS='@functional' MOBILE=true npm run test
```

## 🐳 Docker Execution

### Run Tests in Container
```bash
docker-compose up --build test
```

**Docker runs both desktop and mobile tests using Firefox for maximum compatibility.**


**✅ Docker works on ALL platforms:**
- ✅ Apple Silicon M1/M2 (using Firefox)
- ✅ Intel/AMD64 machines (using Firefox)
- ✅ CI/CD pipelines
- ✅ All Linux distributions

## 🏷️ Running Tests by Tags

### Available Tags
- `@smoke` - Basic application loading
- `@functional` - Core functionality tests
- `@validation` - Input validation tests
- `@bug-detection` - Validation and bug detection tests
- `@exists` - Check if specific items exist
- `@edit` - Edit functionality tests
- `@delete` - Delete functionality tests
- `@basic` - Basic functionality tests

### Tag Expression Examples
```bash
# Single tags
TAGS='@smoke' npm run test:chrome
TAGS='@functional' npm run test:firefox
TAGS='@bug-detection' npm run test:mobile

# Logical expressions
TAGS='@smoke and not @bug-detection' npm run test:chrome
TAGS='@functional or @validation' npm run test:firefox
TAGS='@edit and not @delete' npm run test:chrome

# Complex expressions
TAGS='@smoke and (@functional or @validation)' npm run test:chrome
TAGS='not @bug-detection and (@edit or @delete)' npm run test:firefox

# With different browsers and mobile
TAGS='@smoke' BROWSER=firefox npm run test
TAGS='@functional' MOBILE=true npm run test
TAGS='@validation' BROWSER=chrome HEADLESS=false npm run test
```

### Tag Expression Syntax
- **AND**: `@smoke and @functional`
- **OR**: `@smoke or @functional`  
- **NOT**: `not @bug-detection`
- **Parentheses**: `@smoke and (@functional or @validation)`
- **Complex**: `@smoke and not (@bug-detection or @validation)`

## ⚙️ Configuration & Scripts

### Centralized Configuration
This project uses a **unified WebdriverIO configuration** (`wdio/wdio.conf.ts`) that dynamically adapts based on environment variables:

- **Single config file** handles all scenarios (Chrome, Firefox, Mobile, Docker)
- **Environment variables** control browser, headless mode, mobile emulation, and tags
- **No duplicate configs** - everything is managed in one place

### Available Scripts
```bash
# Basic execution
npm run test                    # Default configuration
npm run test:chrome            # Chrome with headless
npm run test:firefox           # Firefox with headless  
npm run test:mobile            # Mobile emulation
npm run test:docker            # Docker execution

# Report management
npm run allure:generate         # Generate Allure report
npm run allure:open            # Open Allure report
npm run allure:serve           # Serve Allure report
npm run allure:clean           # Clean old reports
```

### Environment Variables
```bash
# Browser selection
BROWSER=chrome                  # or firefox
HEADLESS=true                  # or false (to see browser)
MOBILE=true                    # Enable mobile emulation

# Test filtering
TAGS='@smoke'                  # Tag expressions
SPEC=./tests/features/...      # Specific feature file

# Mobile settings
MOBILE_WIDTH=412               # Mobile width
MOBILE_HEIGHT=915              # Mobile height
```

## 📊 Test Reports

### Generate Reports
```bash
npm run allure:generate
npm run allure:open
```

### View Reports
- **Allure Report**: `npm run allure:open`
- **Serve Reports**: `npm run allure:serve`

## 🧪 Test Coverage

### Functional Tests
- ✅ Application loads successfully
- ✅ Create new items
- ✅ Edit existing items  
- ✅ Delete items
- ✅ Check item exists: "Creators: Matt Duffer, Ross Duffer"

### Validation Tests (Bug Detection)
- ✅ Image size validation (320x320px)
- ✅ Description length validation (300 chars max)
- ✅ Image aspect ratio validation

## 🐛 Bug Reports

See `BUG_REPORTS.md` for detailed bug documentation.

## 🔍 Debugging & Visualization

### Running Tests with Visible Browsers
```bash
# See Chrome in action (for debugging)
HEADLESS=false npm run test:chrome

# See Firefox in action (for debugging)
HEADLESS=false npm run test:firefox

# Mobile emulation with visible browser
HEADLESS=false MOBILE=true npm run test:chrome
```

### Why HEADLESS Mode?
- **HEADLESS=true**: Browser runs without visible window (faster, CI/CD friendly)
- **HEADLESS=false**: Browser opens visible window (useful for debugging)
- **Default**: Tests run in headless mode for speed and compatibility

### Debugging Tips
```bash
# Run specific test with visible browser
HEADLESS=false TAGS='@smoke' npm run test:chrome

# Run mobile test with visible browser
HEADLESS=false MOBILE=true TAGS='@functional' npm run test:chrome

# Run single feature with visible browser
HEADLESS=false SPEC=./tests/features/create-item.feature npm run test:chrome
```

## 🔧 Troubleshooting

### Common Issues

**Node.js Version Issues:**
```bash
# Check Node version
node --version

# If version is too old, update Node.js
# Download from https://nodejs.org/
```

**Docker Issues:**
```bash
# Check Docker is running
docker --version

# Start Docker Desktop if not running
# On macOS: Open Docker Desktop app
# On Windows: Start Docker Desktop
```

**Permission Issues (Linux/macOS):**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

**Chrome/Firefox Not Found:**
```bash
# Install Chrome (if not present)
# Download from https://www.google.com/chrome/

# Install Firefox (if not present)  
# Download from https://www.mozilla.org/firefox/
```

**Docker Build Fails:**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild from scratch
docker-compose up --build --force-recreate test
```

**Allure Reports Not Working:**
```bash
# Clean and regenerate
npm run allure:clean
npm run allure:generate
npm run allure:open
```


## 🛠️ Tech Stack

- **WebdriverIO** + TypeScript
- **Cucumber/Gherkin** for BDD
- **Page Object Model** pattern
- **Allure** reporting
- **Docker** support
- **Cross-platform** compatibility

## 📝 BDD Approach for Manual Testers

This test suite is designed to be easily understood by manual testers with limited technical knowledge. We use:

**BDD Structure**: All tests are written in plain English using Gherkin syntax, making them readable for both technical and non-technical team members.

**Step Definitions**: Each test step is clearly defined and documented, so manual testers can understand exactly what each test does.

**AllureLogger**: We generate detailed reports in Allure that show exactly what each step does internally, making it easy to understand test execution and debug issues.

**Clear Test Names**: Test scenarios have descriptive names that explain the business logic being tested.

## 🔧 Solution Architecture & Challenges

### The Chrome Docker Problem

During development, we encountered a significant challenge with Chrome in Docker containers on Apple Silicon (M1/M2) machines:

**Problem**: Chrome headless mode fails with "Unable to receive message from renderer" errors when running in Docker containers on ARM64 architecture (Apple Silicon).

**Root Cause**: The issue stems from Chrome's architecture emulation when running AMD64 containers on ARM64 hosts. Chrome's headless mode has compatibility issues with the emulation layer, causing communication failures between the browser and WebDriver.

### Our Solution

**Local Development**: 
- Chrome works perfectly for local development
- Firefox also works locally and provides an alternative

**Docker/CI Environment**:
- Firefox is used exclusively in Docker containers
- Firefox has better compatibility with ARM64→AMD64 emulation
- This ensures consistent behavior across all platforms

### Why This Approach

1. **Chrome Local**: Fast, reliable, and familiar for development
2. **Firefox Docker**: Stable, compatible, and works on all architectures
3. **Future Work**: We plan to continue investigating Chrome Docker solutions
4. **CI/CD Ready**: Works seamlessly in GitHub Actions and other CI environments

### Future Improvements

This is our first version of the solution. We plan to continue working on:
- Chrome Docker compatibility research
- Alternative browser configurations
- Performance optimizations
- Enhanced CI/CD integration

The current solution provides a solid foundation that works reliably across all platforms while we continue to explore better Chrome Docker integration.