const path = require('path');

function makeConfig() {
  const isHeadless = (process.env.HEADLESS ?? 'true') !== 'false';
  const browser = (process.env.BROWSER ?? 'chrome').toLowerCase();
  const isMobile = (process.env.MOBILE ?? 'false') === 'true';
  const tags = process.env.TAGS ?? '';
  const spec = process.env.SPEC;

  const chromeArgs = [
    isHeadless ? '--headless=new' : '',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--window-size=1366,768',
  ].filter(Boolean);

  const capabilities = browser === 'firefox'
    ? [{
        browserName: 'firefox',
        acceptInsecureCerts: true,
        'moz:firefoxOptions': { args: [isHeadless ? '-headless' : ''] }
      }]
    : [{
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
          args: chromeArgs,
          ...(isMobile
            ? {
                mobileEmulation: {
                  deviceMetrics: { width: 412, height: 915, pixelRatio: 2 },
                  userAgent: 'Mobile'
                }
              }
            : {})
        }
      }];

  const cfg = {
    runner: 'local',
    specs: spec ? [spec] : [path.resolve(__dirname, '../tests/features/**/*.feature')],
    maxInstances: 1,
    logLevel: 'info',

    framework: 'cucumber',
    cucumberOpts: {
      requireModule: ['ts-node/register/transpile-only'],
      require: [path.resolve(__dirname, '../tests/step-definitions/**/*.ts')],
      timeout: 60000,
      tagExpression: tags
    },

    reporters: [
      'spec',
      ['allure', {
        outputDir: 'allure-results',
        useCucumberStepReporter: true,
        disableWebdriverStepsReporting: true,
      }]
    ],

    automationProtocol: 'webdriver',

    hostname: process.env.WDIO_HOST || undefined,
    port: process.env.WDIO_PORT ? Number(process.env.WDIO_PORT) : undefined,
    path: process.env.WDIO_PATH || undefined,

    capabilities
  };

  return cfg;
}

module.exports = { makeConfig };
module.exports.default = makeConfig();