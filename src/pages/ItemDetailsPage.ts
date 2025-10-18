import { BasePage } from './BasePage'

export class ItemDetailsPage extends BasePage {
    // Selectors for the Item Details section
    protected selectors = {
        textarea: 'textarea[name="text"]',
        imageInput: 'input[type="file"][id="InputImage"]',
        createButton: 'button[ng-click*="createItem"]',
        itemDetailsSection: 'form[name="strangerlist.detailsForm"]'
    }

    /**
     * Enter text in the description textarea
     */
    async enterDescription(text: string): Promise<void> {
        await this.waitForElement(this.selectors.textarea)
        await this.clearAndType(this.selectors.textarea, text)
    }

    /**
     * Upload an image file
     */
    async uploadImage(filePath: string): Promise<void> {
        await this.waitForElement(this.selectors.imageInput)
        const fileInput = await $(this.selectors.imageInput)
        await fileInput.setValue(filePath)
    }

    /**
     * Click the Create Item button
     */
    async clickCreateButton(): Promise<void> {
        await this.waitForElement(this.selectors.createButton)
        await this.clickElement(this.selectors.createButton)
    }

    /**
     * Get the placeholder text of the textarea
     */
    async getTextareaPlaceholder(): Promise<string> {
        await this.waitForElement(this.selectors.textarea)
        return await $(this.selectors.textarea).getAttribute('placeholder')
    }

    /**
     * Get the current text in the textarea
     */
    async getTextareaValue(): Promise<string> {
        await this.waitForElement(this.selectors.textarea)
        return await $(this.selectors.textarea).getValue()
    }

    /**
     * Check if the Item Details section is visible
     */
    async isItemDetailsVisible(): Promise<boolean> {
        return await this.isElementDisplayed(this.selectors.itemDetailsSection)
    }

    /**
     * Get the current value of the image input
     */
    async getImageInputValue(): Promise<string> {
        await this.waitForElement(this.selectors.imageInput)
        return await $(this.selectors.imageInput).getValue()
    }
}
