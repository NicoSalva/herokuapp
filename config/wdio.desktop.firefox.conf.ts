import { baseConfig } from './wdio.base.conf'
import { TestConfigManager } from '../src/config/TestConfig'
import { browser } from '@wdio/globals'

const configManager = TestConfigManager.getInstance()
const testConfig = configManager.getConfig()

export const config = {
  ...baseConfig,
  
  capabilities: [{
    maxInstances: 1,
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: [
        '-headless',
        '--window-size=1920,1080'
      ]
    }
  }],

  before: function () {
    browser.url(testConfig.baseUrl)
  }
}
