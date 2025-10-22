import { BasePage } from './BasePage';
import { ItemListLocators } from '../locators/ItemListLocators';

export class ItemListPage extends BasePage {
  // Use page-specific locators
  protected locators = new ItemListLocators();

  /**
   * Get all items in the list
   */
  async getAllItems(): Promise<WebdriverIO.ElementArray> {
    await this.waitForElement(this.locators.itemList);
    return await $$(this.locators.itemList);
  }

  /**
   * Get the text content of all items
   */
  async getAllItemTexts(): Promise<string[]> {
    const items = await this.getAllItems();
    const texts: string[] = [];

    for (let i = 0; i < items.length; i++) {
      // Get the text from the p.story.ng-binding element inside each li
      const storyElement = await items[i].$(this.locators.itemText);
      if (await storyElement.isExisting()) {
        const text = await storyElement.getText();
        texts.push(text);
      }
    }

    return texts;
  }

  /**
   * Find an item by its text content
   */
  async findItemByText(itemText: string): Promise<WebdriverIO.Element | null> {
    const items = await this.getAllItems();

    for (let i = 0; i < items.length; i++) {
      // Get the text from the p.story.ng-binding element inside each li
      const storyElement = await items[i].$(this.locators.itemText);
      if (await storyElement.isExisting()) {
        const text = await storyElement.getText();
        if (text.includes(itemText)) {
          return items[i];
        }
      }
    }

    return null;
  }

  /**
   * Check if an item exists in the list
   */
  async isItemInList(itemText: string): Promise<boolean> {
    const item = await this.findItemByText(itemText);
    return item !== null;
  }

  /**
   * Get the count of items in the list
   */
  async getItemCount(): Promise<number> {
    const items = await this.getAllItems();
    return items.length;
  }

  /**
   * Click edit button for a specific item
   */
  async clickEditForItem(itemText: string): Promise<void> {
    const item = await this.findItemByText(itemText);
    if (item) {
      const editButton = await item.$(this.locators.editButton);
      await editButton.click();
    } else {
      throw new Error(`Item with text "${itemText}" not found`);
    }
  }

  /**
   * Click delete button for a specific item
   */
  async clickDeleteForItem(itemText: string): Promise<void> {
    const item = await this.findItemByText(itemText);
    if (item) {
      const deleteButton = await item.$(this.locators.deleteButton);
      await deleteButton.click();
    } else {
      throw new Error(`Item with text "${itemText}" not found`);
    }
  }
}
