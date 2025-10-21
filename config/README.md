# WebdriverIO Configuration Files

This directory contains all WebdriverIO configuration files organized by purpose.

## Configuration Files

### `wdio.base.conf.ts`
**Base configuration** - Contains common settings shared by all other configurations.
- Common reporters (spec, allure)
- Cucumber options
- Base URL and timeouts
- Step definitions paths

### `wdio.desktop.chrome.conf.ts`
**Desktop Chrome** - Default configuration for local desktop testing.
- Browser: Chrome
- Mode: Headless
- Use case: Local development and testing

### `wdio.desktop.firefox.conf.ts`
**Desktop Firefox** - Alternative browser for local testing.
- Browser: Firefox
- Mode: Headless
- Use case: Cross-browser testing locally

### `wdio.mobile.conf.ts`
**Mobile Chrome** - Mobile device emulation for local testing.
- Browser: Chrome with mobile emulation
- Device: iPhone 12 Pro (configurable)
- Use case: Mobile testing locally

### `wdio.docker.conf.ts`
**Docker Firefox** - Configuration for containerized testing (desktop + mobile).
- Browser: Firefox
- Mode: Headless
- Use case: Docker containers, CI/CD pipelines
- Optimized for: Apple Silicon M1/M2 compatibility
- Runs: Both desktop and mobile tests

## Usage

```bash
# Local desktop testing
npm run test:desktop:chrome    # Chrome
npm run test:desktop:firefox   # Firefox
npm run test:mobile            # Mobile Chrome

# Docker testing
npm run test:docker            # Firefox in Docker (desktop + mobile)
```

## Configuration Principles

1. **Base Configuration**: All configs extend `wdio.base.conf.ts`
2. **Browser Specific**: Each config targets a specific browser/environment
3. **Environment Specific**: Docker configs are optimized for containers
4. **No Duplication**: Each config serves a unique purpose
