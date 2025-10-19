import { baseConfig } from './wdio.base.conf'
import { TestConfigManager } from './src/config/TestConfig'

const configManager = TestConfigManager.getInstance()
const testConfig = configManager.getConfig()

export const config = {
    ...baseConfig,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',
                ...(testConfig.browser.headless ? ['--headless'] : ['--start-maximized'])
            ]
        }
    }],
    before: function (capabilities: any, specs: any) {
        // Navigate to base URL when browser starts
        browser.url(testConfig.baseUrl)
    }
}