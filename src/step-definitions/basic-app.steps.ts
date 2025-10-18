import { Given, When, Then } from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'

Given('I navigate to the application', async () => {
    await browser.url('http://immense-hollows-74271.herokuapp.com/')
})

When('the page loads completely', async () => {
    await browser.waitUntil(
        () => browser.execute(() => document.readyState === 'complete'),
        { timeout: 10000, timeoutMsg: 'Page did not load completely' }
    )
})

Then('I should see the {string} title', async (expectedTitle: string) => {
    const title = await browser.getTitle()
    expect(title).toContain(expectedTitle)
})

Then('I should be on the correct URL', async () => {
    const currentUrl = await browser.getUrl()
    expect(currentUrl).toContain('immense-hollows-74271.herokuapp.com')
})
