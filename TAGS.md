# 🏷️ Tag Conventions

This document defines the tag conventions used in the Herokuapp test suite for better test organization and execution.

## 📋 Tag Categories

### Core Tags
- **`@smoke`** - Critical functionality tests (fast execution, ~2 min)
  - Application loading
  - Basic item operations
  - Essential user flows
- **`@functional`** - Complete feature tests (comprehensive, ~10 min)
  - Full CRUD operations
  - Validation scenarios
  - Error handling
- **`@bug`** - Regression tests (specific issues)
  - Known bug fixes
  - Edge cases
  - Validation improvements

### Feature-Specific Tags
- **`@create`** - Item creation functionality
- **`@edit`** - Item editing functionality
- **`@delete`** - Item deletion functionality
- **`@list`** - Item listing functionality
- **`@validation`** - Input validation tests

### Environment Tags
- **`@mobile`** - Mobile-specific behavior
- **`@desktop`** - Desktop-specific behavior
- **`@docker`** - Docker-specific tests

### Priority Tags
- **`@critical`** - Must pass for deployment
- **`@high`** - High priority features
- **`@medium`** - Medium priority features
- **`@low`** - Low priority features

## 🎯 Tag Usage Examples

### Quick Validation (CI/CD)
```bash
# Run only critical smoke tests
TAGS='@smoke' npm run test:firefox

# Run smoke tests excluding known bugs
TAGS='@smoke and not @bug' npm run test:firefox
```

### 🖥️ Visual Testing (Browser Visible)
```bash
# Run tests with browser visible for debugging
HEADLESS=false TAGS='@smoke' npm run test:firefox

# Debug specific feature with Chrome visible
HEADLESS=false TAGS='@create' npm run test:chrome

# Mobile testing with visible browser
HEADLESS=false TAGS='@mobile' npm run test:chrome

# Docker testing with visible browser
HEADLESS=false TAGS='@functional' npm run test:docker:firefox
```

### Feature Testing
```bash
# Test specific feature
TAGS='@create' npm run test:firefox

# Test multiple features
TAGS='@create and @edit' npm run test:firefox

# Test all functional tests
TAGS='@functional' npm run test:firefox
```

### Environment Testing
```bash
# Mobile-specific tests
TAGS='@mobile' npm run test:chrome

# Desktop-specific tests
TAGS='@desktop' npm run test:firefox

# Docker-specific tests
TAGS='@docker' npm run test:docker:firefox
```

### Priority Testing
```bash
# Critical tests only
TAGS='@critical' npm run test:firefox

# High and critical priority
TAGS='@critical or @high' npm run test:firefox

# Exclude low priority
TAGS='not @low' npm run test:firefox
```

## 🔄 Tag Combinations

### Logical Operators
- **AND**: `@smoke and @functional`
- **OR**: `@smoke or @functional`
- **NOT**: `not @bug`
- **Parentheses**: `@smoke and (@functional or @validation)`

### Complex Expressions
```bash
# Smoke tests excluding bugs
TAGS='@smoke and not @bug' npm run test:firefox

# Functional tests with mobile support
TAGS='@functional and @mobile' npm run test:chrome

# Critical tests excluding known issues
TAGS='@critical and not @bug' npm run test:firefox
```

## 📊 Tag Execution Matrix

| Tag | Purpose | Execution Time | Use Case |
|-----|---------|----------------|----------|
| `@smoke` | Critical path | ~2 min | CI/CD, quick validation |
| `@functional` | Complete features | ~10 min | Full regression |
| `@bug` | Regression tests | ~5 min | Bug fix validation |
| `@create` | Creation feature | ~3 min | Feature testing |
| `@edit` | Editing feature | ~3 min | Feature testing |
| `@delete` | Deletion feature | ~2 min | Feature testing |
| `@list` | Listing feature | ~2 min | Feature testing |
| `@validation` | Input validation | ~5 min | Validation testing |
| `@mobile` | Mobile behavior | ~5 min | Mobile testing |
| `@desktop` | Desktop behavior | ~5 min | Desktop testing |

## 🚀 CI/CD Integration

### Pull Request Validation
```bash
# Run smoke tests on PRs
TAGS='@smoke' npm run test:firefox
```

### Main Branch Validation
```bash
# Run full functional suite
TAGS='@functional' npm run test:firefox
```

### Release Validation
```bash
# Run all tests excluding known bugs
TAGS='not @bug' npm run test:firefox
```

## 📝 Adding New Tags

### Guidelines
1. **Use descriptive names** - Clear purpose and scope
2. **Follow naming conventions** - Use lowercase with hyphens
3. **Document usage** - Update this file when adding tags
4. **Test combinations** - Ensure tag combinations work correctly

### Examples
```gherkin
@smoke @create
Scenario: Create a basic item
  Given I am on the application
  When I create a new item
  Then the item should be created

@functional @validation
Scenario: Validate image size
  Given I am creating an item
  When I upload an oversized image
  Then I should see a validation error
```

## 🔍 Tag Debugging

### Check Available Tags
```bash
# List all tags in features
grep -r "@" tests/features/ | grep -o "@[a-zA-Z0-9_-]*" | sort | uniq
```

### Validate Tag Expressions
```bash
# Test tag expression syntax
TAGS='@smoke and @functional' npm run test:firefox --dry-run
```

### Tag Statistics
```bash
# Count scenarios by tag
grep -r "@smoke" tests/features/ | wc -l
grep -r "@functional" tests/features/ | wc -l
```

## 🛠️ Development & Debugging

### Visual Debugging
```bash
# Debug with browser visible
HEADLESS=false TAGS='@smoke' npm run test:firefox

# Step-by-step debugging
HEADLESS=false TAGS='@create' npm run test:chrome

# Mobile debugging
HEADLESS=false TAGS='@mobile' npm run test:chrome
```

### Development Workflow
```bash
# 1. Run smoke tests to verify basic functionality
TAGS='@smoke' npm run test:firefox

# 2. Debug specific feature with visible browser
HEADLESS=false TAGS='@create' npm run test:chrome

# 3. Run full functional tests
TAGS='@functional' npm run test:firefox

# 4. Generate reports
npm run allure:generate
npm run allure:open
```

### Troubleshooting
```bash
# If tests fail, run with visible browser to see what's happening
HEADLESS=false TAGS='@failing-tag' npm run test:firefox

# Debug specific scenario
HEADLESS=false SPEC=./dist/tests/features/create-item.feature npm run test:chrome
```
