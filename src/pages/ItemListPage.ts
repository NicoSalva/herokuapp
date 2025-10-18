import { BasePage } from './BasePage'

export class ItemListPage extends BasePage {
    // Selectors for the item list
    protected selectors = {
        itemList: '[ng-repeat="item in items"]',
        itemText: '[ng-repeat="item in items"]',
        editButton: 'button[ng-click*="setCurrentItem"]',
        deleteButton: 'button[ng-click*="open"]',
        listContainer: '.container-fluid'
    }

    /**
     * Get all items in the list
     */
    async getAllItems(): Promise<WebdriverIO.ElementArray> {
        await this.waitForElement(this.selectors.itemList)
        return await $$(this.selectors.itemList)
    }

    /**
     * Get the text content of all items
     */
    async getAllItemTexts(): Promise<string[]> {
        const items = await this.getAllItems()
        const texts: string[] = []
        
        for (let i = 0; i < items.length; i++) {
            const text = await items[i].getText()
            texts.push(text)
        }
        
        return texts
    }

    /**
     * Find an item by its text content
     */
    async findItemByText(itemText: string): Promise<WebdriverIO.Element | null> {
        const items = await this.getAllItems()
        
        for (let i = 0; i < items.length; i++) {
            const text = await items[i].getText()
            if (text.includes(itemText)) {
                return items[i]
            }
        }
        
        return null
    }

    /**
     * Check if an item exists in the list
     */
    async isItemInList(itemText: string): Promise<boolean> {
        const item = await this.findItemByText(itemText)
        return item !== null
    }

    /**
     * Get the count of items in the list
     */
    async getItemCount(): Promise<number> {
        const items = await this.getAllItems()
        return items.length
    }

    /**
     * Click edit button for a specific item
     */
    async clickEditForItem(itemText: string): Promise<void> {
        const item = await this.findItemByText(itemText)
        if (item) {
            const editButton = await item.$('button:contains("Edit")')
            await editButton.click()
        } else {
            throw new Error(`Item with text "${itemText}" not found`)
        }
    }

    /**
     * Click delete button for a specific item
     */
    async clickDeleteForItem(itemText: string): Promise<void> {
        const item = await this.findItemByText(itemText)
        if (item) {
            const deleteButton = await item.$('button:contains("Delete")')
            await deleteButton.click()
        } else {
            throw new Error(`Item with text "${itemText}" not found`)
        }
    }
}
