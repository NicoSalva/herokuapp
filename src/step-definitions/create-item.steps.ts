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
    
    // Wait a bit more for content to render
    await browser.pause(2000)
    
    // Validate that we're on the correct page
    const title = await browser.getTitle()
    expect(title).toContain('Stranger List')
    
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
    
    // Click the create button
    await createItemPage.clickCreateButton()
    
    // Wait for the new item to appear in the list
    await browser.waitUntil(
        async () => {
            const newCount = await itemListPage.getItemCount()
            return newCount > initialCount
        },
        { timeout: 10000, timeoutMsg: 'New item did not appear in the list' }
    )
})

Then('I should see the new item in the list', async () => {
    // Validate that the item count increased
    const itemCount = await itemListPage.getItemCount()
    expect(itemCount).toBeGreaterThan(0)
    
    // Validate that the list is visible and has content
    const allItems = await itemListPage.getAllItemTexts()
    expect(allItems.length).toBeGreaterThan(0)
})

Then('the item should contain the text {string}', async (expectedText: string) => {
    // Validate that the specific item exists in the list
    const itemExists = await itemListPage.isItemInList(expectedText)
    expect(itemExists).toBe(true)
    
    // Get all items and verify the text is present
    const allItems = await itemListPage.getAllItemTexts()
    const foundItem = allItems.find(item => item.includes(expectedText))
    expect(foundItem).toBeDefined()
    expect(foundItem).toContain(expectedText)
})
