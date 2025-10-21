# Stranger List - Test Suite

Automated tests for the Stranger List app using WebdriverIO, TypeScript and Cucumber.

## Setup

```bash
npm install
```

## Run Tests

### Desktop
```bash
npm run test:desktop        # All desktop tests
npm run test:exists         # Check item exists
npm run test:edit           # Edit item tests
npm run test:delete         # Delete item tests
npm run test:bugs           # Bug detection tests
```

### Mobile  
```bash
npm run test:mobile
```

### With Docker
```bash
docker-compose up --build test-desktop
```

**⚠️ Known Limitation:** Docker execution with Chrome requires **AMD64 architecture**. It does NOT work on ARM64 (Apple Silicon M1/M2) machines due to Chrome compatibility issues in emulated environments.

**✅ Docker WILL work on:**
- CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins, etc.)
- AMD64/x86_64 Linux servers
- Intel-based machines

**✅ Local execution works perfectly on:**
- macOS (including M1/M2)
- Linux
- Windows

**🚀 CI/CD - GitHub Actions:**
This project includes automated testing workflow that runs both Desktop and Mobile tests on every push/PR. The workflow executes in a clean Linux AMD64 environment and generates Allure reports. See `.github/workflows/docker-tests.yml` and `.github/DOCKER_VALIDATION.md` for details.

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