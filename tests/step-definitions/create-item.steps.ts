import { When, Then } from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'
import { CreateItemPage } from '../../src/pages/CreateItemPage.js'
import { TestAssets } from '../../src/config/TestAssets.js'
import { QAUtils } from '../../src/utils/QAUtils.js'
import { allureLogger } from '../../src/utils/AllureLogger.js'

const createItemPage = new CreateItemPage()

// ============================================================================
// FORM INTERACTION STEPS
// ============================================================================

When('I enter {string} in the description field', async (description: string) => {
    // Validate that the textarea is available before entering text
    const placeholder = await createItemPage.getTextareaPlaceholder()
    await expect(placeholder).toContain('Maximum allowed length: 300 characters', { message: '❌ Expected textarea placeholder to contain \'Maximum allowed length: 300 characters\', but got: ' + placeholder })
    allureLogger('Textarea placeholder validated', placeholder)
    
    // Enter the description
    await createItemPage.enterDescription(description)
    allureLogger('Description entered in textarea', { length: description.length })
    
    // Validate that the text was entered correctly
    const enteredText = await createItemPage.getTextareaValue()
    await expect(enteredText).toBe(description, { message: `❌ Expected entered text to be '${description}', but got: '${enteredText}'` })
    allureLogger('Description validation passed', { expected: description, actual: enteredText })
})

When('I enter a description with {int} characters', async (characterCount: number) => {
    // Generate a description with the specified number of characters
    const description = 'A'.repeat(characterCount)
    allureLogger('Generated description with specified character count', { characterCount })
    
    // Validate that the textarea is available before entering text
    const placeholder = await createItemPage.getTextareaPlaceholder()
    await expect(placeholder).toContain('Maximum allowed length: 300 characters', { message: '❌ Expected textarea placeholder to contain \'Maximum allowed length: 300 characters\', but got: ' + placeholder })
    allureLogger('Textarea placeholder validated for long description', placeholder)
    
    // Enter the description
    await createItemPage.enterDescription(description)
    allureLogger('Long description entered in textarea', { characterCount })
    
    // Validate that the text was entered correctly
    const enteredText = await createItemPage.getTextareaValue()
    await expect(enteredText).toBe(description, { message: `❌ Expected entered text to be '${description}', but got: '${enteredText}'` })
    await expect(enteredText.length).toBe(characterCount, { message: `❌ Expected text length to be ${characterCount}, but got: ${enteredText.length}` })
    allureLogger('Long description validation passed', { 
        expectedLength: characterCount, 
        actualLength: enteredText.length 
    })
})

// ============================================================================
// IMAGE UPLOAD STEPS
// ============================================================================

When('I upload an image file', async () => {
    // Upload correct size image (320x320px)
    const imagePath = TestAssets.getCorrectImage()
    await createItemPage.uploadImage(imagePath)
    allureLogger('Correct size image uploaded', { imagePath })
})

When('I upload a small image file \\(100x100px\\)', async () => {
    // Upload small image (should be rejected if validation works)
    const imagePath = TestAssets.getImageByType('small')
    await createItemPage.uploadImage(imagePath)
    allureLogger('Small image uploaded for validation test', { imagePath, size: '100x100px' })
})

When('I upload a large image file \\(500x500px\\)', async () => {
    // Upload large image (should be rejected if validation works)
    const imagePath = TestAssets.getImageByType('big')
    await createItemPage.uploadImage(imagePath)
    allureLogger('Large image uploaded for validation test', { imagePath, size: '500x500px' })
})

When('I upload an image with wrong aspect ratio', async () => {
    // Upload image with wrong aspect ratio (should be rejected if validation works)
    const imagePath = TestAssets.getImageByType('wrong-ratio')
    await createItemPage.uploadImage(imagePath)
    allureLogger('Wrong aspect ratio image uploaded for validation test', { imagePath })
})

// ============================================================================
// BUTTON INTERACTION STEPS
// ============================================================================

When('I click the Create Item button', async () => {
    // Click the create button
    await createItemPage.clickCreateButton()
    allureLogger('Create Item button clicked')
    
    // Get initial count from common steps
    const initialCount = (global as any).initialItemCount || 0
    allureLogger('Starting item creation process', { initialCount })
    
    // Use advanced waitUntil pattern similar to Sircupa example
    // Wait until the item count increases with custom polling
    const result = await QAUtils.waitUntilCondition(
        async () => {
            // Wait for AJAX requests to complete
            await QAUtils.waitForAjaxComplete()
            
            // Check if header text has updated
            const headerElement = await $('h1.ng-binding')
            if (await headerElement.isDisplayed()) {
                const headerText = await headerElement.getText()
                const match = headerText.match(/List of items \((\d+)\)/)
                
                if (match && match[1]) {
                    const currentCount = parseInt(match[1])
                    // Return the result if count increased, null if not
                    return currentCount > initialCount ? {
                        currentCount,
                        headerText,
                        success: true
                    } : null
                }
            }
            return null
        },
        {
            timeout: 30000, // 30 seconds for item creation
            interval: 2000, // Check every 2 seconds
            timeoutMsg: `Item count did not increase from ${initialCount} within 30 seconds - Create Item button may not be working`
        }
    )
    
    // Validate the result
    if (!result || !result.success) {
        throw new Error(`Item creation failed - count did not increase from ${initialCount}`)
    }
    
    allureLogger('Item created successfully', { 
        initialCount, 
        currentCount: result.currentCount,
        increase: result.currentCount - initialCount
    })
})

// ============================================================================
// VALIDATION STEPS (DISABLED BUTTON)
// ============================================================================

Then('the Create button should be disabled', async () => {
    const button = await $(createItemPage['locators'].createButton as string)
    const isEnabled = await button.isEnabled()
    await expect(isEnabled).toBe(false, { message: `❌ Expected Create button to be disabled, but it was enabled: ${isEnabled}` })
    allureLogger('Create button is disabled as expected')
})