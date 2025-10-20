import { TestConfigManager } from './src/config/TestConfig'

const configManager = TestConfigManager.getInstance()
const testConfig = configManager.getConfig()

export const baseConfig = {
    runner: 'local',
    specs: ['./tests/features/**/*.feature'],
    maxInstances: 1,
    logLevel: 'info',
    baseUrl: testConfig.baseUrl,
    waitforTimeout: testConfig.timeout.default,
    connectionRetryTimeout: testConfig.retry.timeout,
    connectionRetryCount: testConfig.retry.count,
    framework: 'cucumber',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            useCucumberStepReporter: true,
            disableMochaHooks: true,
            disableWebdriverStepsReporting: true,
            disableCucumberHooks: true,
            addConsoleLogs: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    cucumberOpts: {
        require: ['./tests/step-definitions/**/*.ts'],
        backtrace: false,
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    }
}
