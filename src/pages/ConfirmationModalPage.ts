import { BasePage } from './BasePage.js'
import { ConfirmationModalLocators } from '../locators/ConfirmationModalLocators.js'

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
        // Try main selector
        const main = await $(this.locators.confirmButton)
        if (await main.isExisting() && await main.isDisplayed()) {
            await main.click()
            return
        }
        // Try danger/primary fallbacks
        const danger = await $(this.locators.confirmDangerBtn)
        if (await danger.isExisting() && await danger.isDisplayed()) {
            await danger.click()
            return
        }
        const primary = await $(this.locators.confirmPrimaryBtn)
        if (await primary.isExisting() && await primary.isDisplayed()) {
            await primary.click()
            return
        }
        // Try xpath by text
        const byText = await $("//div[contains(@class,'modal')]//button[normalize-space()='Yes, delete it!']")
        if (await byText.isExisting() && await byText.isDisplayed()) {
            await byText.click()
            return
        }
        throw new Error('Confirm button not found in modal')
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
