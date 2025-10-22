import { BasePage } from './BasePage.js'
import { EditItemLocators } from '../locators/EditItemLocators.js'

export class EditItemPage extends BasePage {
    // Use page-specific locators
    protected locators = new EditItemLocators()

    /**
     * Enter text in the description textarea
     */
    async enterDescription(text: string): Promise<void> {
        await this.waitForElement(this.locators.textarea)
        await this.clearAndType(this.locators.textarea, text)
    }

    /**
     * Upload an image file
     */
    async uploadImage(filePath: string): Promise<void> {
        await this.waitForElement(this.locators.imageInput)
        const fileInput = await $(this.locators.imageInput)
        await fileInput.setValue(filePath)
    }

    /**
     * Click the Update Item button
     */
    async clickUpdateButton(): Promise<void> {
        await this.waitForElement(this.locators.updateButton)
        await this.clickElement(this.locators.updateButton)
    }

    /**
     * Click the Cancel button
     */
    async clickCancelButton(): Promise<void> {
        await this.waitForElement(this.locators.cancelButton)
        await this.clickElement(this.locators.cancelButton)
    }

    /**
     * Get the placeholder text of the textarea
     */
    async getTextareaPlaceholder(): Promise<string> {
        await this.waitForElement(this.locators.textarea)
        return await $(this.locators.textarea).getAttribute('placeholder')
    }

    /**
     * Get the current text in the textarea
     */
    async getTextareaValue(): Promise<string> {
        await this.waitForElement(this.locators.textarea)
        return await $(this.locators.textarea).getValue()
    }

    /**
     * Check if the form is visible
     */
    async isFormVisible(): Promise<boolean> {
        return await this.isElementDisplayed(this.locators.formSection)
    }

    /**
     * Clear the textarea
     */
    async clearDescription(): Promise<void> {
        await this.waitForElement(this.locators.textarea)
        await $(this.locators.textarea).clearValue()
    }
}
