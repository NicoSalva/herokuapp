describe('Basic Application Test', () => {
    it('should open the herokuapp application', async () => {
        // Navigate to the application
        await browser.url('http://immense-hollows-74271.herokuapp.com/')
        
        // Wait for page to load
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            { timeout: 10000, timeoutMsg: 'Page did not load completely' }
        )
        
        // Verify we are on the correct page
        const currentUrl = await browser.getUrl()
        expect(currentUrl).toContain('immense-hollows-74271.herokuapp.com')
        
        // Verify page title
        const title = await browser.getTitle()
        expect(title).toContain('Stranger List')
        
        console.log('✅ Application loaded successfully')
    })
})

