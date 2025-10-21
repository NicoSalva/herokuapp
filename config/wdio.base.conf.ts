import { TestConfigManager } from '../src/config/TestConfig'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const configManager = TestConfigManager.getInstance()
const testConfig = configManager.getConfig()

export const baseConfig = {
    runner: 'local',
    specs: [path.resolve(__dirname, '../tests/features/**/*.feature')],
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
        require: [path.resolve(__dirname, '../tests/step-definitions/**/*.ts')],
        requireModule: ['ts-node/register'],
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
