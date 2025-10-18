export const config = {
    runner: 'local',
    specs: [
        './src/tests/**/*.spec.ts'
    ],
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json'
        }
    },
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
        }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://immense-hollows-74271.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}