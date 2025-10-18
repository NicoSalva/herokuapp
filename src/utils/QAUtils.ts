export class QAUtils {
    /**
     * Wait for element to be visible and clickable
     */
    static async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
        await $(selector).waitForDisplayed({ timeout });
        await $(selector).waitForClickable({ timeout });
    }

    /**
     * Take screenshot with timestamp
     */
    static async takeScreenshot(name: string): Promise<void> {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `screenshots/${name}_${timestamp}.png`;
        await browser.saveScreenshot(filename);
        console.log(`Screenshot saved: ${filename}`);
    }

    /**
     * Generate random string for unique test data
     */
    static generateRandomString(length: number = 10): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Wait for page to load completely
     */
    static async waitForPageLoad(): Promise<void> {
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            { timeout: 10000, timeoutMsg: 'Page did not load completely' }
        );
    }

    /**
     * Clear and type text in input field
     */
    static async clearAndType(selector: string, text: string): Promise<void> {
        await this.waitForElement(selector);
        await $(selector).clearValue();
        await $(selector).setValue(text);
    }

    /**
     * Verify element contains text
     */
    static async verifyTextContains(selector: string, expectedText: string): Promise<boolean> {
        await this.waitForElement(selector);
        const actualText = await $(selector).getText();
        return actualText.includes(expectedText);
    }

    /**
     * Get current timestamp for logging
     */
    static getTimestamp(): string {
        return new Date().toISOString();
    }
}

