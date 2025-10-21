import { baseConfig } from './wdio.base.conf'
import { TestConfigManager } from './src/config/TestConfig'
import { browser } from '@wdio/globals'

const configManager = TestConfigManager.getInstance()
const testConfig = configManager.getConfig()

export const config = {
  ...baseConfig,
  
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--headless',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-setuid-sandbox',
        '--window-size=1920,1080'
      ]
    }
  }],

  before: function () {
    browser.url(testConfig.baseUrl)
  }
}
