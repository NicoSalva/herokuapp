const path = require('path');

exports.makeConfig = (overrides = {}) => ({
  runner: 'local',
  specs: [path.resolve(__dirname, '../dist/tests/features/**/*.feature')],
  maxInstances: 1,
  logLevel: 'info',

  framework: 'cucumber',
  cucumberOpts: {
    require: [path.resolve(__dirname, '../dist/tests/step-definitions/**/*.js')],
    timeout: 60000,
    tagExpression: process.env.TAGS || '',
    retry: 1,
  },

  // Anti-flaky configuration
  specFileRetries: 1,
  specFileRetryDelay: 2000,
  specFileRetryAttempts: 2,

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        useCucumberStepReporter: true,
        disableWebdriverStepsReporting: true,
      },
    ],
  ],

  automationProtocol: 'webdriver',
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // Screenshots on failure
  afterStep: function (step, context, { error, result, duration, passed, retries }) {
    if (error) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotName = `failure-${timestamp}.png`;
      browser.saveScreenshot(`./screenshots/${screenshotName}`);
      console.log(`Screenshot saved: ${screenshotName}`);
    }
  },

  ...overrides,
});
