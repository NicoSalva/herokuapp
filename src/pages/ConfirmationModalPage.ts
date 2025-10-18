import { BasePage } from './BasePage'

export class ConfirmationModalPage extends BasePage {
    // Selectors for the confirmation modal
    protected selectors = {
        modal: '.modal',
        modalTitle: '.modal-title',
        modalBody: '.modal-body',
        confirmButton: '.modal-footer .btn-primary',
        cancelButton: '.modal-footer .btn-warning',
        modalContent: '.modal-content'
    }

    /**
     * Wait for modal to be visible
     */
    async waitForModal(): Promise<void> {
        await this.waitForElement(this.selectors.modal)
    }

    /**
     * Get the modal title text
     */
    async getModalTitle(): Promise<string> {
        await this.waitForModal()
        return await this.getElementText(this.selectors.modalTitle)
    }

    /**
     * Get the modal body text
     */
    async getModalBodyText(): Promise<string> {
        await this.waitForModal()
        return await this.getElementText(this.selectors.modalBody)
    }

    /**
     * Click the confirm button (Yes, delete it!)
     */
    async clickConfirmButton(): Promise<void> {
        await this.waitForModal()
        await this.clickElement(this.selectors.confirmButton)
    }

    /**
     * Click the cancel button
     */
    async clickCancelButton(): Promise<void> {
        await this.waitForModal()
        await this.clickElement(this.selectors.cancelButton)
    }

    /**
     * Check if modal is visible
     */
    async isModalVisible(): Promise<boolean> {
        return await this.isElementDisplayed(this.selectors.modal)
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
