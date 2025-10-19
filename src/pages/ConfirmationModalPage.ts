import { BasePage } from './BasePage'
import { ConfirmationModalLocators } from '../locators/ConfirmationModalLocators'

export class ConfirmationModalPage extends BasePage {
    // Use page-specific locators
    protected locators = new ConfirmationModalLocators()

    /**
     * Wait for modal to be visible
     */
    async waitForModal(): Promise<void> {
        await this.waitForElement(this.locators.modal)
    }

    /**
     * Get the modal title text
     */
    async getModalTitle(): Promise<string> {
        await this.waitForModal()
        return await this.getElementText(this.locators.modalTitle)
    }

    /**
     * Get the modal body text
     */
    async getModalBodyText(): Promise<string> {
        await this.waitForModal()
        return await this.getElementText(this.locators.modalBody)
    }

    /**
     * Click the confirm button (Yes, delete it!)
     */
    async clickConfirmButton(): Promise<void> {
        await this.waitForModal()
        await this.clickElement(this.locators.confirmButton)
    }

    /**
     * Click the cancel button
     */
    async clickCancelButton(): Promise<void> {
        await this.waitForModal()
        await this.clickElement(this.locators.cancelButton)
    }

    /**
     * Check if modal is visible
     */
    async isModalVisible(): Promise<boolean> {
        return await this.isElementDisplayed(this.locators.modal)
    }

    /**
     * Wait for modal to disappear
     */
    async waitForModalToDisappear(): Promise<void> {
        await browser.waitUntil(
            async () => !(await this.isModalVisible()),
            { timeout: 5000, timeoutMsg: 'Modal did not disappear' }
        )
    }
}
