// wdio/wdio.conf.ts
import type { Options } from '@wdio/types'
import path from 'path'
import { fileURLToPath } from 'url'
import { TestConfigManager } from '../src/config/TestConfig.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const cfgMgr = TestConfigManager.getInstance()
const appCfg = cfgMgr.getConfig()

/** === ENV SWITCHES === */
const {
  WDIO_TARGET = 'local',                 // local | remote
  WDIO_HOST = 'selenium-chrome',          // host del contenedor Selenium
  WDIO_PORT = '4444',
  WDIO_PATH = '/',
  BROWSER = 'chrome',                     // chrome | firefox
  HEADLESS = 'true',
  TAGS = '',                              // ej: "@smoke and not @wip"
  SPEC = '',                              // ej: "./tests/features/create-item.feature"
  MOBILE = 'false',                       // emulación móvil genérica (chrome)
  MOBILE_WIDTH = '412',                   // ~ Pixel 7 width
  MOBILE_HEIGHT = '915',                  // ~ Pixel 7 height
  MOBILE_PIXEL_RATIO = '3',
  UA = '',                                // opcional: userAgent custom
  MAX_INSTANCES = '1',
} = process.env

const isRemote = WDIO_TARGET.toLowerCase() === 'remote'
const isHeadless = HEADLESS.toLowerCase() === 'true'
const isMobile = MOBILE.toLowerCase() === 'true'

const specs = SPEC
  ? [path.resolve(process.cwd(), SPEC)]
  : [path.resolve(__dirname, '../tests/features/**/*.feature')]

function buildCaps(): any {
  if (BROWSER.toLowerCase() === 'firefox') {
    return {
      browserName: 'firefox',
      acceptInsecureCerts: true,
      'moz:firefoxOptions': {
        args: [isHeadless ? '-headless' : '']
      }
    }
  }

  // CHROME / CHROMIUM
  const chromeArgs = [
    isHeadless ? '--headless=new' : '',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--window-size=1366,768'
  ].filter(Boolean)

  const chromeOptions: Record<string, any> = { args: chromeArgs }

  if (isMobile) {
    chromeOptions.mobileEmulation = {
      deviceMetrics: {
        width: Number(MOBILE_WIDTH),
        height: Number(MOBILE_HEIGHT),
        pixelRatio: Number(MOBILE_PIXEL_RATIO)
      },
      ...(UA ? { userAgent: UA } : {})
    }
    // ventana grande para que no recorte screenshots
    chromeArgs.push(`--window-size=${MOBILE_WIDTH},${MOBILE_HEIGHT}`)
  }

  return {
    browserName: 'chrome',
    acceptInsecureCerts: true,
    'goog:chromeOptions': chromeOptions
  }
}

export const config: Options.Testrunner = {
  runner: 'local',
  specs,
  maxInstances: Number(MAX_INSTANCES),
  logLevel: 'info',

  // tiempos desde tu TestConfig
  baseUrl: appCfg.baseUrl,
  waitforTimeout: appCfg.timeout.default,
  connectionRetryTimeout: appCfg.retry.timeout,
  connectionRetryCount: appCfg.retry.count,

  // remoto vs local
  ...(isRemote ? {
    protocol: 'http',
    hostname: WDIO_HOST,
    port: Number(WDIO_PORT),
    path: WDIO_PATH
  } : {}),

  framework: 'cucumber',
  cucumberOpts: {
    require: [path.resolve(__dirname, '../tests/step-definitions/**/*.ts')],
    requireModule: ['ts-node/register'],
    timeout: isMobile ? 120000 : 60000,
    tagExpression: TAGS,
    format: ['pretty']
  },

  automationProtocol: 'webdriver',
  capabilities: [buildCaps()],

  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      useCucumberStepReporter: true,
      disableMochaHooks: true,
      disableWebdriverStepsReporting: true,
      disableCucumberHooks: true,
      addConsoleLogs: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],

  before: async function () {
    browser.url(appCfg.baseUrl)
  }
}
export default config
