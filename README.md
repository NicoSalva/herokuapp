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

## Tests

✅ App carga bien  
✅ Crear item  
✅ Editar item  
✅ Borrar item creado (flujo completo)  
✅ Existe item: "Creators: Matt Duffer, Ross Duffer"  
✅ Validaciones: largo máx y tamaño/ratio de imagen  

## Bugs

Ver `BUG_REPORTS.md` (simple y directo).

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