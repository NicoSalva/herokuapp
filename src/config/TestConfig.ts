export const TestConfig = {
    // Application URL
    baseUrl: 'http://immense-hollows-74271.herokuapp.com',
    
    // Timeouts
    timeouts: {
        short: 5000,
        medium: 10000,
        long: 30000
    },
    
    // Test data
    testData: {
        newItemTitle: 'Test Item Created by Automation',
        newItemDescription: 'This is a test item created by automated testing',
        editItemTitle: 'Edited Test Item',
        editItemDescription: 'This item has been edited by automation',
        maxLengthDescription: 'A'.repeat(1000), // 1000 characters
        expectedItemText: 'Creators: Matt Duffer, Ross Duffer'
    },
    
    // Browser configurations
    browsers: {
        chrome: 'chrome',
        firefox: 'firefox'
    },
    
    // Mobile device configurations
    mobileDevices: {
        iPhone12: 'iPhone 12 Pro',
        samsungS20: 'Samsung Galaxy S20',
        pixel5: 'Pixel 5'
    }
}

