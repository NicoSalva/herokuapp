import { BasePage } from './BasePage'

export class CreateItemPage extends BasePage {
    // Selectors for the create item form
    protected selectors = {
        textarea: 'textarea',
        createButton: 'button',
        formSection: '.container-fluid'
    }

    /**
     * Enter text in the description textarea
     */
    async enterDescription(text: string): Promise<void> {
        await this.waitForElement(this.selectors.textarea)
        await this.clearAndType(this.selectors.textarea, text)
    }

    /**
     * Click the Create Item button
     */
    async clickCreateButton(): Promise<void> {
        // Find the button with "Create Item" text
        const buttons = await $$(this.selectors.createButton)
        let createButton = null
        
        for (let i = 0; i < buttons.length; i++) {
            const buttonText = await buttons[i].getText()
            if (buttonText.includes('Create Item')) {
                createButton = buttons[i]
                break
            }
        }
        
        if (createButton) {
            await createButton.click()
        } else {
            throw new Error('Create Item button not found')
        }
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
     * Check if the form is visible
     */
    async isFormVisible(): Promise<boolean> {
        return await this.isElementDisplayed(this.selectors.formSection)
    }
}
