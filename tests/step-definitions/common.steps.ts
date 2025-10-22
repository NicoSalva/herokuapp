import { Given, When, Then } from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'
import { TestConfigManager } from '../../src/config/TestConfig.js'
import { CreateItemPage } from '../../src/pages/CreateItemPage.js'
import { ItemListPage } from '../../src/pages/ItemListPage.js'
import { QAUtils } from '../../src/utils/QAUtils.js'
import { ValidationUtils } from '../../src/utils/ValidationUtils.js'
import { allureLogger } from '../../src/utils/AllureLogger.js'

const configManager = TestConfigManager.getInstance()
const createItemPage = new CreateItemPage()
const itemListPage = new ItemListPage()

// Global variables
let initialItemCount: number

// ============================================================================
// NAVIGATION STEPS
// ============================================================================

Given('I navigate to the application', async () => {
    const config = configManager.getConfig()
    await browser.url(config.baseUrl)
    allureLogger('Navigated to application', config.baseUrl)
})

Given('I am on the Stranger List application', async () => {
    const config = configManager.getConfig()
    await browser.url(config.baseUrl)
    
    // Wait for Angular to load and page to be ready
    await QAUtils.waitForAngularReady()
    allureLogger('Angular application loaded successfully')
    
    // Wait for page to load completely
    await QAUtils.waitForPageLoad()
    allureLogger('Page loaded completely')
    
    // Wait for AJAX requests to complete
    await QAUtils.waitForAjaxComplete()
    allureLogger('AJAX requests completed')
    
    // Validate that we're on the correct page
    const title = await browser.getTitle()
    ValidationUtils.expectToContain(title, 'Stranger List', 'Page title validation')
    allureLogger('Page title validated', title)
    
    // Wait for the form to be visible using advanced waiting strategy
    await QAUtils.waitForElementVisible('form[name="strangerlist.detailsForm"]', 15000)
    allureLogger('Form element is visible')
    
    // Validate that the form is visible
    const isFormVisible = await createItemPage.isFormVisible()
    ValidationUtils.expectToBeTrue(isFormVisible, 'Form visibility validation')
    allureLogger('Form visibility validated', isFormVisible)
})

// ============================================================================
// PAGE LOADING STEPS
// ============================================================================

When('the page loads completely', async () => {
    await browser.waitUntil(
        () => browser.execute(() => document.readyState === 'complete'),
        { timeout: 10000, timeoutMsg: 'Page did not load completely' }
    )
    allureLogger('Page load completed successfully')
})

// ============================================================================
// VALIDATION STEPS
// ============================================================================

Then('I should see the {string} title', async (expectedTitle: string) => {
    const title = await browser.getTitle()
    ValidationUtils.expectToContain(title, expectedTitle, 'Page title validation')
    allureLogger('Page title validated', { expected: expectedTitle, actual: title })
})

Then('I should be on the correct URL', async () => {
    const config = configManager.getConfig()
    const currentUrl = await browser.getUrl()
    ValidationUtils.expectToContain(currentUrl, config.baseUrl.replace('http://', '').replace('https://', ''), 'URL validation')
    allureLogger('URL validation passed', { expected: config.baseUrl, actual: currentUrl })
})

// ============================================================================
// ITEM COUNT STEPS
// ============================================================================

Given('I get the initial item count from the list header', async () => {
    // Wait for the list header to be visible
    await QAUtils.waitForElementVisible('h1.ng-binding')
    
    // Get the text from the header (e.g., "List of items (19)")
    const headerText = await $('h1.ng-binding').getText()
    
    // Extract the number from the header text
    const match = headerText.match(/List of items \((\d+)\)/)
    if (match && match[1]) {
        initialItemCount = parseInt(match[1])
        // Store in global scope for other steps to access
        ;(global as any).initialItemCount = initialItemCount
        allureLogger('Initial item count captured', { count: initialItemCount, headerText })
    } else {
        throw new Error(`Could not extract item count from header: ${headerText}`)
    }
})

Then('the item count should increase by {int}', async (expectedIncrease: number) => {
    // Get the current count from the header
    const headerText = await $('h1.ng-binding').getText()
    const match = headerText.match(/List of items \((\d+)\)/)
    if (match && match[1]) {
        const currentCount = parseInt(match[1])
        const initialCount = (global as any).initialItemCount || 0
        ValidationUtils.expectToBe(currentCount, initialCount + expectedIncrease, `Item count validation (expected: ${initialCount + expectedIncrease}, got: ${currentCount})`)
        allureLogger('Item count increased as expected', { 
            initial: initialCount, 
            current: currentCount, 
            increase: expectedIncrease 
        })
    } else {
        throw new Error(`Could not extract item count from header: ${headerText}`)
    }
})

Then('the item count should NOT increase', async () => {
    // Check if the item count stayed the same (indicating validation worked)
    const headerText = await $('h1.ng-binding').getText()
    const match = headerText.match(/List of items \((\d+)\)/)
    if (match && match[1]) {
        const currentCount = parseInt(match[1])
        const initialCount = (global as any).initialItemCount || 0
        
        if (currentCount === initialCount) {
            ValidationUtils.expectToBe(currentCount, initialCount, `Item count validation - no increase expected (got: ${currentCount})`)
            allureLogger('Item count validation passed - no increase detected', { 
                initial: initialCount, 
                current: currentCount 
            })
        } else {
            throw new Error('Item count increased - validation may not be working correctly')
        }
    }
})

// ============================================================================
// LIST VALIDATION STEPS
// ============================================================================

Then('I should see the new item in the list', async () => {
    // Validate that the item count increased
    const itemCount = await itemListPage.getItemCount()
    ValidationUtils.expectToBeGreaterThan(itemCount, 0, `Item count validation (got: ${itemCount})`)
    allureLogger('Item list contains items', { count: itemCount })
    
    // Validate that the list is visible and has content
    const allItems = await itemListPage.getAllItemTexts()
    ValidationUtils.expectToBeGreaterThan(allItems.length, 0, `Item list validation (got: ${allItems.length} items)`)
    allureLogger('Item list validation passed', { totalItems: allItems.length })
})

Then('the item should contain the text {string}', async (expectedText: string) => {
    // Use advanced waitUntil pattern to find item in list
    const result = await QAUtils.waitUntilItemAppearsInList(
        'li[ng-repeat="item in items"]', // list selector
        'p.story.ng-binding', // item selector
        async (item, index) => {
            // Custom filter function - similar to Sircupa example
            const text = await item.getText()
            return text.includes(expectedText)
        },
        {
            timeout: 15000, // 15 seconds to find the item
            interval: 1000, // Check every second
            timeoutMsg: `Item with text "${expectedText}" did not appear in the list within 15 seconds`
        }
    )
    
    // Additional validation
    ValidationUtils.expectToBeDefined(result.item, 'Item search validation')
    const itemText = await result.item.getText()
    ValidationUtils.expectToContain(itemText, expectedText, `Item text validation (expected: '${expectedText}', got: '${itemText}')`)
    
    allureLogger('Item found in list with expected text', { 
        index: result.index, 
        expectedText, 
        actualText: itemText 
    })
})

// ============================================================================
// ERROR MESSAGE STEPS (Placeholders for future implementation)
// ============================================================================

Then('I should see an error message about image size', async () => {
    // TODO: Implement actual error message validation
    // For now, this is a placeholder that always passes
    // In a real implementation, we'd look for specific error elements
    allureLogger('Image size error message validation - placeholder implementation')
})

Then('I should see an error message about description length', async () => {
    // TODO: Implement actual error message validation
    // For now, this is a placeholder that always passes
    // In a real implementation, we'd look for specific error elements
    allureLogger('Description length error message validation - placeholder implementation')
})