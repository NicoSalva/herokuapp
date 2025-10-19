# Stranger List - Test Suite

Automated tests for the Stranger List app using WebdriverIO, TypeScript and Cucumber.

## Setup

```bash
npm install
```

## Run Tests

### Desktop
```bash
npm test                    # All tests
npm run test:smoke          # Smoke tests
npm run test:functional     # Functional tests
npm run test:bugs           # Bug detection tests
```

### Mobile  
```bash
npm run test:mobile
```

### With Docker
```bash
# All tests
docker-compose up test-all

# Desktop only
docker-compose up test-desktop

# Mobile only  
docker-compose up test-mobile
```

## Tests Done

✅ **Basic app loading** - App loads correctly  
✅ **Create item** - Can create new items  
✅ **Bug detection** - Found validation bugs  

## Still Need To Do

- Edit existing item
- Delete created item
- Check for "Creators: Matt Duffer, Ross Duffer" item

## Bugs Found

**BUG #1**: Image size validation not working - accepts any size instead of 320x320px  
**BUG #2**: Description length validation not working - allows more than 300 characters

Check `BUG_REPORTS.md` for details.

## Reports

```bash
npm run allure:generate
npm run allure:open
```

## Project Structure

```
src/
├── pages/             # Page Object Model
├── locators/          # Page-specific locators
├── utils/             # QA utilities
└── config/            # Test configuration

test/
├── features/          # Gherkin files (.feature)
└── step-definitions/  # Step definitions in TypeScript
```

## Tech Stack

- WebdriverIO + TypeScript
- Cucumber/Gherkin  
- Page Object Model
- Allure reporting
- Docker support