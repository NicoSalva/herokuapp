const { makeConfig } = require('./wdio.base.cjs');

const BROWSER = (process.env.BROWSER || 'chrome').toLowerCase();
const HEADLESS = (process.env.HEADLESS ?? 'true') !== 'false';
const MOBILE = (process.env.MOBILE ?? 'false') === 'true';

const chromeArgs = [
  HEADLESS ? '--headless=new' : '',
  '--no-sandbox',
  '--disable-dev-shm-usage',
  '--window-size=1366,768',
].filter(Boolean);

const caps =
  BROWSER === 'firefox'
    ? [
        {
          browserName: 'firefox',
          acceptInsecureCerts: true,
          'moz:firefoxOptions': {
            args: [HEADLESS ? '-headless' : '', '--width=1920', '--height=1080'].filter(Boolean),
          },
        },
      ]
    : [
        {
          browserName: 'chrome',
          acceptInsecureCerts: true,
          'goog:chromeOptions': {
            args: chromeArgs,
            ...(MOBILE
              ? {
                  mobileEmulation: {
                    deviceMetrics: { width: 412, height: 915, pixelRatio: 2 },
                    userAgent: 'Mozilla/5.0 (Linux; Android 13) Mobile',
                  },
                }
              : {}),
          },
        },
      ];

exports.config = makeConfig({
  hostname: process.env.WDIO_HOST || 'selenium',
  port: Number(process.env.WDIO_PORT || 4444),
  path: process.env.WDIO_PATH || '/',
  capabilities: caps,
});
