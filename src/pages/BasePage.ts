import { QAUtils } from '../utils/QAUtils'

export class BasePage {
    // Common selectors that might be used across pages
    protected selectors: any = {
        loadingSpinner: '[data-testid="loading"]',
        errorMessage: '[data-testid="error"]',
        successMessage: '[data-testid="success"]'
    }

    /**
     * Navigate to the application
     */
    async open(): Promise<void> {
        await browser.url('/')
        await QAUtils.waitForPageLoad()
    }

    /**
     * Get page title
     */
    async getTitle(): Promise<string> {
        return await browser.getTitle()
    }

    /**
     * Take screenshot of current page
     */
    async takeScreenshot(name: string): Promise<void> {
        await QAUtils.takeScreenshot(name)
    }

    /**
     * Wait for page to be ready
     */
    async waitForPageReady(): Promise<void> {
        await QAUtils.waitForPageLoad()
    }

    /**
     * Check if element is displayed
     */
    async isElementDisplayed(selector: string): Promise<boolean> {
        try {
            return await $(selector).isDisplayed()
        } catch (error) {
            return false
        }
    }

    /**
     * Get text from element
     */
    async getElementText(selector: string): Promise<string> {
        await QAUtils.waitForElement(selector)
        return await $(selector).getText()
    }

    /**
     * Click on element
     */
    async clickElement(selector: string): Promise<void> {
        await QAUtils.waitForElement(selector)
        await $(selector).click()
    }

    /**
     * Type text in input field
     */
    async typeInField(selector: string, text: string): Promise<void> {
        await QAUtils.clearAndType(selector, text)
    }

    /**
     * Wait for element to be visible and clickable
     */
    async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
        await QAUtils.waitForElement(selector, timeout)
    }

    /**
     * Clear and type text in input field
     */
    async clearAndType(selector: string, text: string): Promise<void> {
        await QAUtils.clearAndType(selector, text)
    }
}

