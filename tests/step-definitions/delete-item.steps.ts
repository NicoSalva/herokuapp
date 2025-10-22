import { When, Then } from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'
import { ItemListPage } from '../../src/pages/ItemListPage.js'
import { ConfirmationModalPage } from '../../src/pages/ConfirmationModalPage.js'
import { CreateItemPage } from '../../src/pages/CreateItemPage.js'
import { allureLogger } from '../../src/utils/AllureLogger.js'
import { TestAssets } from '../../src/config/TestAssets.js'
import { QAUtils } from '../../src/utils/QAUtils.js'

const listPage = new ItemListPage()
const modal = new ConfirmationModalPage()
const createPage = new CreateItemPage()

let currentItemText = ''

When('I create a new temporary item', async () => {
    await QAUtils.waitForElementVisible('form[name="strangerlist.detailsForm"]')
    const unique = `Auto-Temp-${Date.now()}`
    currentItemText = unique
    await createPage.enterDescription(unique)
    allureLogger('Entered temp description', unique)
    // Upload valid image like in create flow
    const imagePath = TestAssets.getCorrectImage()
    await createPage.uploadImage(imagePath)
    allureLogger('Uploaded valid image for temp item', imagePath)
    // Use existing create button from CreateItemPage
    await createPage.clickCreateButton()
    allureLogger('Clicked Create Item button for temp item')
    // Ensure network/activity settles before validating in list
    await QAUtils.waitForAjaxComplete()
    await QAUtils.waitForAngularReady()
    await QAUtils.waitForPageLoad()

    // Additionally, wait until header count increases
    const initialCount = (global as any).initialItemCount || 0
    const incResult = await QAUtils.waitUntilCondition(async () => {
        const headerEl = await $('h1.ng-binding')
        if (!(await headerEl.isDisplayed())) return null
        const text = await headerEl.getText()
        const match = text.match(/List of items \((\d+)\)/)
        if (!match || !match[1]) return null
        const current = parseInt(match[1])
        return current > initialCount ? current : null
    }, { timeout: 30000, interval: 1000, timeoutMsg: `Item count did not increase from ${ (global as any).initialItemCount } after creating temp item` })
    allureLogger('Header count increased after creation', { from: initialCount, to: incResult })
})

Then('I should see the current item in the list', async () => {
    const result = await QAUtils.waitUntilItemAppearsInList(
        'li[ng-repeat="item in items"]',
        'p.story.ng-binding',
        async (item) => (await item.getText()).includes(currentItemText),
        { timeout: 30000, interval: 1000, timeoutMsg: `Temp item not found: ${currentItemText}` }
    )
    await expect(result.item).toBeDefined({ message: '❌ Expected to find the current item in the list, but no item was found' })
    allureLogger('Temp item present in list', currentItemText)
})

When('I delete the item with text {string}', async (itemText: string) => {
    await QAUtils.waitForElementVisible('li[ng-repeat="item in items"]')
    const existsBefore = await listPage.isItemInList(itemText)
    await expect(existsBefore).toBe(true, { message: `❌ Expected item '${itemText}' to exist before deletion, but it was not found` })
    allureLogger('Item exists before delete', itemText)

    await listPage.clickDeleteForItem(itemText)
    allureLogger('Clicked Delete for item', itemText)

    await modal.waitForModal()
    allureLogger('Delete confirmation modal visible')

    await modal.clickConfirmButton()
    allureLogger('Confirmed delete in modal')
})

Then('I should not see the item with text {string}', async (itemText: string) => {
    // Wait until the item disappears from the list
    await QAUtils.waitUntilCondition(async () => {
        return (await listPage.isItemInList(itemText)) ? null : true
    }, { timeout: 15000, interval: 1000, timeoutMsg: `Item "${itemText}" did not disappear after delete` })

    const existsAfter = await listPage.isItemInList(itemText)
    await expect(existsAfter).toBe(false, { message: `❌ Expected item '${itemText}' to be deleted from list, but it still exists` })
    allureLogger('Verified item was deleted from list', itemText)
})

When('I delete the current item', async () => {
    await QAUtils.waitForElementVisible('li[ng-repeat="item in items"]')
    const existsBefore = await listPage.isItemInList(currentItemText)
    await expect(existsBefore).toBe(true, { message: `❌ Expected current item '${currentItemText}' to exist before deletion, but it was not found` })
    allureLogger('Current item exists before delete', currentItemText)

    await listPage.clickDeleteForItem(currentItemText)
    allureLogger('Clicked Delete for current item', currentItemText)

    await modal.waitForModal()
    allureLogger('Delete confirmation modal visible')

    await modal.clickConfirmButton()
    allureLogger('Confirmed delete in modal')
})

Then('I should not see the current item', async () => {
    await QAUtils.waitUntilCondition(async () => {
        return (await listPage.isItemInList(currentItemText)) ? null : true
    }, { timeout: 15000, interval: 1000, timeoutMsg: `Item not deleted: ${currentItemText}` })

    const existsAfter = await listPage.isItemInList(currentItemText)
    await expect(existsAfter).toBe(false, { message: `❌ Expected current item '${currentItemText}' to be deleted from list, but it still exists` })
    allureLogger('Verified current item was deleted from list', currentItemText)
})


