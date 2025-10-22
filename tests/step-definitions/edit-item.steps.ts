import { When, Then } from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'
import { ItemListPage } from '../../src/pages/ItemListPage.js'
import { EditItemPage } from '../../src/pages/EditItemPage.js'
import { allureLogger } from '../../src/utils/AllureLogger.js'
import { QAUtils } from '../../src/utils/QAUtils.js'
import { ValidationUtils } from '../../src/utils/ValidationUtils.js'

const listPage = new ItemListPage()
const editPage = new EditItemPage()

When('I edit the item with text {string} to {string}', async (fromText: string, toText: string) => {
    await QAUtils.waitForElementVisible('li[ng-repeat="item in items"]')
    await listPage.clickEditForItem(fromText)
    allureLogger('Clicked Edit for item', fromText)

    await QAUtils.waitForElementVisible('form[name="strangerlist.detailsForm"]')
    ValidationUtils.expectToBeTrue(await editPage.isFormVisible(), 'Edit form visibility validation')
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
    ValidationUtils.expectToBeDefined(result.item, 'Edited item search validation')
})

Then('I should see the item with text {string}', async (expected: string) => {
    const texts = await listPage.getAllItemTexts()
    ValidationUtils.expectArrayToContain(texts, t => t.includes(expected), `Item text search validation (expected: '${expected}', available: ${texts.join(', ')})`)
    allureLogger('Verified edited item appears in list', expected)
})


