# Stranger List Test Suite

This project has automated tests for the Stranger List app using WebdriverIO, TypeScript and Cucumber.

## 🐛 Bug Found

**BUG #1: Create Item button is broken**
- The button doesn't create new items in the list
- More details in `BUG_REPORTS.md`
- Test that finds this bug: `src/features/create-item.feature`

## 🚀 Setup

### What you need
- Node.js (version 16 or higher)
- npm or yarn

### Install
```bash
npm install
```

### Run Tests
```bash
# Run all tests
npm test

# Run specific test
npx wdio run wdio.conf.ts --spec src/features/basic-app.feature

# Run bug detection test
npx wdio run wdio.conf.ts --spec src/features/create-item.feature
```

## 📁 Project Structure

```
src/
├── features/           # Gherkin files (.feature)
├── step-definitions/   # Step definitions in TypeScript
├── pages/             # Page Object Model
├── utils/             # QA utilities
└── config/            # Test configuration

test-assets/           # Test resources (images, etc.)
```

## 🧪 Tests Done

### ✅ Working Tests
- **Basic App Loading**: Checks that the app loads correctly
- **Bug Detection**: Finds that Create Item button doesn't work

### 🔄 Still Need To Do
- Edit existing item
- Delete created item  
- Check max description length
- Check for "Creators: Matt Duffer, Ross Duffer" item

## 🐛 Bugs Found

Check `BUG_REPORTS.md` for complete bug details.

## 🛠️ Technologies Used

- **WebdriverIO**: Test automation framework
- **TypeScript**: Programming language
- **Cucumber/Gherkin**: BDD for readable tests
- **Page Object Model**: Design pattern for maintainable tests

## 📝 Notes

- Tests are designed to be readable by manual QAs
- Using Page Object Model to separate responsibilities
- Step definitions have validation logic
- Page objects handle elements and interactions
