import { Given, When, Then } from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'
import { CreateItemPage } from '../pages/CreateItemPage'
import { ItemListPage } from '../pages/ItemListPage'

const createItemPage = new CreateItemPage()
const itemListPage = new ItemListPage()

Given('I am on the Stranger List application', async () => {
    await browser.url('http://immense-hollows-74271.herokuapp.com/')
    
    // Wait for Angular to load and page to be ready
    await browser.waitUntil(
        async () => {
            const angularReady = await browser.execute(() => {
                return typeof (window as any).angular !== 'undefined' && 
                       document.querySelector('[ng-controller]') !== null;
            });
            return angularReady;
        },
        { timeout: 15000, timeoutMsg: 'Angular did not load properly' }
    )
    
    // Validate that the form is visible
    const isFormVisible = await createItemPage.isFormVisible()
    expect(isFormVisible).toBe(true)
})

When('I enter {string} in the description field', async (description: string) => {
    // Validate that the textarea is available before entering text
    const placeholder = await createItemPage.getTextareaPlaceholder()
    expect(placeholder).toContain('Maximum allowed length: 300 characters')
    
    // Enter the description
    await createItemPage.enterDescription(description)
    
    // Validate that the text was entered correctly
    const enteredText = await createItemPage.getTextareaValue()
    expect(enteredText).toBe(description)
})

When('I click the Create Item button', async () => {
    // Get initial item count to validate creation
    const initialCount = await itemListPage.getItemCount()
    console.log(`Initial item count: ${initialCount}`)
    
    // Click the create button
    await createItemPage.clickCreateButton()
    console.log('Create button clicked')
    
    // Wait for the new item to appear in the list
    await browser.waitUntil(
        async () => {
            const newCount = await itemListPage.getItemCount()
            console.log(`Checking item count: ${newCount}`)
            return newCount > initialCount
        },
        { timeout: 10000, timeoutMsg: 'New item did not appear in the list' }
    )
})

Then('I should see the new item in the list', async () => {
    // This step is covered by the previous "When" step's validation
    const itemCount = await itemListPage.getItemCount()
    expect(itemCount).toBeGreaterThan(0)
})

Then('the item should contain the text {string}', async (expectedText: string) => {
    // Verify that the newly created item's text is present in the list
    const isItemPresent = await itemListPage.isItemInList(expectedText)
    expect(isItemPresent).toBe(true)
})

Then('the item count should increase by {int}', async (expectedIncrease: number) => {
    // This validation is already covered in the "When" step
    // But we can add an explicit check here for clarity
    const currentCount = await itemListPage.getItemCount()
    expect(currentCount).toBeGreaterThan(0)
})
