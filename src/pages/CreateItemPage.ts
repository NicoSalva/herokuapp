import { BasePage } from './BasePage.js'
import { CreateItemLocators } from '../locators/CreateItemLocators.js'

export class CreateItemPage extends BasePage {
    // Use page-specific locators
    protected locators = new CreateItemLocators()

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
     * Click the Create Item button
     */
    async clickCreateButton(): Promise<void> {
        await this.waitForElement(this.locators.createButton)
        await this.clickElement(this.locators.createButton)
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
}
