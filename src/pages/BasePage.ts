import { QAUtils } from '../utils/QAUtils.js'
import { TestConfigManager } from '../config/TestConfig.js'

export class BasePage {
    protected configManager = TestConfigManager.getInstance()

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
    async waitForElement(selector: string, timeout?: number): Promise<void> {
        const config = this.configManager.getConfig()
        const waitTimeout = timeout || config.timeout.element
        await QAUtils.waitForElement(selector, waitTimeout)
    }

    /**
     * Clear and type text in input field
     */
    async clearAndType(selector: string, text: string): Promise<void> {
        await QAUtils.clearAndType(selector, text)
    }

    /**
     * Check if running on mobile
     */
    isMobile(): boolean {
        return this.configManager.isMobile()
    }

    /**
     * Check if running on desktop
     */
    isDesktop(): boolean {
        return this.configManager.isDesktop()
    }

    /**
     * Get device-specific selector (deprecated - use locators instead)
     * @deprecated Use page-specific locators instead
     */
    getDeviceSelector(desktopSelector: string, mobileSelector?: string): string {
        if (this.isMobile() && mobileSelector) {
            return mobileSelector
        }
        return desktopSelector
    }

    /**
     * Scroll to element (useful for mobile)
     */
    async scrollToElement(selector: string): Promise<void> {
        const element = await $(selector)
        await element.scrollIntoView()
    }

    /**
     * Wait for Angular to be ready
     */
    async waitForAngular(): Promise<void> {
        await browser.waitUntil(
            async () => {
                const angularReady = await browser.execute(() => {
                    return typeof (window as any).angular !== 'undefined' && 
                           document.querySelector('[ng-controller]') !== null;
                });
                return angularReady;
            },
            { 
                timeout: this.configManager.getConfig().timeout.page, 
                timeoutMsg: 'Angular did not load properly' 
            }
        )
    }
}

