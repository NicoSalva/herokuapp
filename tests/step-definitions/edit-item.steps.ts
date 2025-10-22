import { When, Then } from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'
import { ItemListPage } from '../../src/pages/ItemListPage.js'
import { EditItemPage } from '../../src/pages/EditItemPage.js'
import { allureLogger } from '../../src/utils/AllureLogger.js'
import { QAUtils } from '../../src/utils/QAUtils.js'

const listPage = new ItemListPage()
const editPage = new EditItemPage()

When('I edit the item with text {string} to {string}', async (fromText: string, toText: string) => {
    await QAUtils.waitForElementVisible('li[ng-repeat="item in items"]')
    await listPage.clickEditForItem(fromText)
    allureLogger('Clicked Edit for item', fromText)

    await QAUtils.waitForElementVisible('form[name="strangerlist.detailsForm"]')
    await expect(await editPage.isFormVisible()).toBe(true, { message: '❌ Expected edit form to be visible, but it was not' })
    allureLogger('Edit form visible')

    await editPage.clearDescription()
    await editPage.enterDescription(toText)
    allureLogger('Entered new description', toText)

    await editPage.clickUpdateButton()
    allureLogger('Clicked Update Item button')

    // Wait until list shows the updated text
    const result = await QAUtils.waitUntilItemAppearsInList(
        'li[ng-repeat="item in items"]',
        'p.story.ng-binding',
        async (item) => (await item.getText()).includes(toText),
        { timeout: 15000, interval: 1000, timeoutMsg: `Edited item with text "${toText}" did not appear` }
    )
    await expect(result.item).toBeDefined({ message: '❌ Expected to find the edited item in the list, but no item was found' })
})

Then('I should see the item with text {string}', async (expected: string) => {
    const texts = await listPage.getAllItemTexts()
    await expect(texts.some(t => t.includes(expected))).toBe(true, { message: `❌ Expected to find item with text '${expected}' in the list, but it was not found. Available texts: ${texts.join(', ')}` })
    allureLogger('Verified edited item appears in list', expected)
})


