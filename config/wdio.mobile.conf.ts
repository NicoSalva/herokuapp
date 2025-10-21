import { baseConfig } from './wdio.base.conf'
import { TestConfigManager } from '../src/config/TestConfig'

const configManager = TestConfigManager.getInstance()
const testConfig = configManager.getConfig()

export const config = {
    ...baseConfig,
    cucumberOpts: {
        ...baseConfig.cucumberOpts,
        timeout: 120000
    },
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            mobileEmulation: {
                deviceName: testConfig.mobile.deviceName
            },
            args: [
                '--headless',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor'
            ]
        }
    }],
    before: function (capabilities: any, specs: any) {
        // Navigate to base URL when browser starts
        browser.url(testConfig.baseUrl)
    }
}