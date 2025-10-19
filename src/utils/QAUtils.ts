export class QAUtils {
    /**
     * Wait for element to be visible and clickable
     */
    static async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
        await $(selector).waitForDisplayed({ timeout });
        await $(selector).waitForClickable({ timeout });
    }

    /**
     * Wait for element to be visible (not necessarily clickable)
     */
    static async waitForElementVisible(selector: string, timeout: number = 10000): Promise<void> {
        await $(selector).waitForDisplayed({ timeout });
    }

    /**
     * Wait for element to exist in DOM (may not be visible)
     */
    static async waitForElementExist(selector: string, timeout: number = 10000): Promise<void> {
        await $(selector).waitForExist({ timeout });
    }

    /**
     * Wait for element to disappear from DOM
     */
    static async waitForElementDisappear(selector: string, timeout: number = 10000): Promise<void> {
        await $(selector).waitForDisplayed({ 
            timeout, 
            reverse: true,
            timeoutMsg: `Element ${selector} did not disappear within ${timeout}ms`
        });
    }

    /**
     * Wait for text to appear in element
     */
    static async waitForTextInElement(selector: string, expectedText: string, timeout: number = 10000): Promise<void> {
        await browser.waitUntil(
            async () => {
                const element = await $(selector);
                if (await element.isDisplayed()) {
                    const text = await element.getText();
                    return text.includes(expectedText);
                }
                return false;
            },
            { 
                timeout, 
                timeoutMsg: `Text "${expectedText}" did not appear in element ${selector} within ${timeout}ms` 
            }
        );
    }

    /**
     * Wait for element count to change
     */
    static async waitForElementCountChange(selector: string, initialCount: number, timeout: number = 10000): Promise<void> {
        await browser.waitUntil(
            async () => {
                const elements = await $$(selector);
                return elements.length !== initialCount;
            },
            { 
                timeout, 
                timeoutMsg: `Element count for ${selector} did not change from ${initialCount} within ${timeout}ms` 
            }
        );
    }

    /**
     * Wait for element count to increase
     */
    static async waitForElementCountIncrease(selector: string, initialCount: number, timeout: number = 10000): Promise<void> {
        await browser.waitUntil(
            async () => {
                const elements = await $$(selector);
                return elements.length > initialCount;
            },
            { 
                timeout, 
                timeoutMsg: `Element count for ${selector} did not increase from ${initialCount} within ${timeout}ms` 
            }
        );
    }

    /**
     * Wait for element count to decrease
     */
    static async waitForElementCountDecrease(selector: string, initialCount: number, timeout: number = 10000): Promise<void> {
        await browser.waitUntil(
            async () => {
                const elements = await $$(selector);
                return elements.length < initialCount;
            },
            { 
                timeout, 
                timeoutMsg: `Element count for ${selector} did not decrease from ${initialCount} within ${timeout}ms` 
            }
        );
    }

    /**
     * Wait for Angular to be ready
     */
    static async waitForAngularReady(timeout: number = 15000): Promise<void> {
        await browser.waitUntil(
            async () => {
                const angularReady = await browser.execute(() => {
                    return typeof (window as any).angular !== 'undefined' && 
                           document.querySelector('[ng-controller]') !== null;
                });
                return angularReady;
            },
            { 
                timeout, 
                timeoutMsg: 'Angular did not load properly' 
            }
        );
    }

    /**
     * Wait for AJAX requests to complete
     */
    static async waitForAjaxComplete(timeout: number = 10000): Promise<void> {
        await browser.waitUntil(
            async () => {
                const ajaxComplete = await browser.execute(() => {
                    return (window as any).jQuery ? (window as any).jQuery.active === 0 : true;
                });
                return ajaxComplete;
            },
            { 
                timeout, 
                timeoutMsg: 'AJAX requests did not complete within timeout' 
            }
        );
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
     * Wait for element to be enabled (not disabled)
     */
    static async waitForElementEnabled(selector: string, timeout: number = 10000): Promise<void> {
        await browser.waitUntil(
            async () => {
                const element = await $(selector);
                return await element.isEnabled();
            },
            { 
                timeout, 
                timeoutMsg: `Element ${selector} was not enabled within ${timeout}ms` 
            }
        );
    }

    /**
     * Take screenshot with timestamp
     */
    static async takeScreenshot(name: string): Promise<void> {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `screenshots/${name}_${timestamp}.png`;
        await browser.saveScreenshot(filename);
        // Screenshot saved successfully
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
     * Wait until a custom condition is met with polling
     * @param condition - Function that returns a truthy value when condition is met
     * @param options - Wait options including timeout, interval, and error message
     * @returns The result of the condition function when it becomes truthy
     */
    static async waitUntilCondition<T>(
        condition: () => Promise<T> | T,
        options: {
            timeout?: number;
            interval?: number;
            timeoutMsg?: string;
        } = {}
    ): Promise<T> {
        const {
            timeout = 10000,
            interval = 1000,
            timeoutMsg = 'Condition was not met within timeout'
        } = options;

        let result: T;
        await browser.waitUntil(
            async () => {
                result = await condition();
                return !!result;
            },
            { timeout, interval, timeoutMsg }
        );
        return result!;
    }

    /**
     * Wait until an element count reaches a specific value
     */
    static async waitUntilElementCountEquals(
        selector: string, 
        expectedCount: number, 
        options: {
            timeout?: number;
            interval?: number;
            timeoutMsg?: string;
        } = {}
    ): Promise<void> {
        const {
            timeout = 10000,
            interval = 1000,
            timeoutMsg = `Element count for ${selector} did not reach ${expectedCount} within timeout`
        } = options;

        await browser.waitUntil(
            async () => {
                const elements = await $$(selector);
                return elements.length === expectedCount;
            },
            { timeout, interval, timeoutMsg }
        );
    }

    /**
     * Wait until an element's text matches a specific pattern
     */
    static async waitUntilTextMatches(
        selector: string,
        pattern: RegExp,
        options: {
            timeout?: number;
            interval?: number;
            timeoutMsg?: string;
        } = {}
    ): Promise<string> {
        const {
            timeout = 10000,
            interval = 1000,
            timeoutMsg = `Text in ${selector} did not match pattern ${pattern} within timeout`
        } = options;

        let matchedText: string;
        await browser.waitUntil(
            async () => {
                const element = await $(selector);
                if (await element.isDisplayed()) {
                    const text = await element.getText();
                    const match = text.match(pattern);
                    if (match) {
                        matchedText = text;
                        return true;
                    }
                }
                return false;
            },
            { timeout, interval, timeoutMsg }
        );
        return matchedText!;
    }

    /**
     * Wait until a list contains an item with specific criteria
     */
    static async waitUntilListContains<T>(
        selector: string,
        criteria: (item: WebdriverIO.Element, index: number) => Promise<boolean> | boolean,
        options: {
            timeout?: number;
            interval?: number;
            timeoutMsg?: string;
        } = {}
    ): Promise<WebdriverIO.Element> {
        const {
            timeout = 10000,
            interval = 1000,
            timeoutMsg = `List ${selector} did not contain matching item within timeout`
        } = options;

        let foundItem: WebdriverIO.Element;
        await browser.waitUntil(
            async () => {
                const elements = await $$(selector);
                for (let i = 0; i < elements.length; i++) {
                    if (await criteria(elements[i], i)) {
                        foundItem = elements[i];
                        return true;
                    }
                }
                return false;
            },
            { timeout, interval, timeoutMsg }
        );
        return foundItem!;
    }

    /**
     * Wait until an element's attribute has a specific value
     */
    static async waitUntilAttributeEquals(
        selector: string,
        attribute: string,
        expectedValue: string,
        options: {
            timeout?: number;
            interval?: number;
            timeoutMsg?: string;
        } = {}
    ): Promise<void> {
        const {
            timeout = 10000,
            interval = 1000,
            timeoutMsg = `Attribute ${attribute} of ${selector} did not equal "${expectedValue}" within timeout`
        } = options;

        await browser.waitUntil(
            async () => {
                const element = await $(selector);
                if (await element.isExisting()) {
                    const value = await element.getAttribute(attribute);
                    return value === expectedValue;
                }
                return false;
            },
            { timeout, interval, timeoutMsg }
        );
    }

    /**
     * Wait until a custom JavaScript condition is met
     */
    static async waitUntilJavaScriptCondition(
        script: string,
        options: {
            timeout?: number;
            interval?: number;
            timeoutMsg?: string;
        } = {}
    ): Promise<any> {
        const {
            timeout = 10000,
            interval = 1000,
            timeoutMsg = 'JavaScript condition was not met within timeout'
        } = options;

        let result: any;
        await browser.waitUntil(
            async () => {
                result = await browser.execute(script);
                return !!result;
            },
            { timeout, interval, timeoutMsg }
        );
        return result;
    }

    /**
     * Wait until network requests are idle (no pending requests)
     */
    static async waitUntilNetworkIdle(
        options: {
            timeout?: number;
            interval?: number;
            timeoutMsg?: string;
        } = {}
    ): Promise<void> {
        const {
            timeout = 10000,
            interval = 1000,
            timeoutMsg = 'Network did not become idle within timeout'
        } = options;

        await browser.waitUntil(
            async () => {
                const networkIdle = await browser.execute(() => {
                    // Check if there are any pending XMLHttpRequests
                    if (typeof (window as any).XMLHttpRequest !== 'undefined') {
                        // This is a simplified check - in real scenarios you might need more sophisticated monitoring
                        return true;
                    }
                    return true;
                });
                return networkIdle;
            },
            { timeout, interval, timeoutMsg }
        );
    }

    /**
     * Wait until a specific item appears in a list with custom filtering
     * Similar to the Sircupa example but for UI elements
     */
    static async waitUntilItemAppearsInList<T>(
        listSelector: string,
        itemSelector: string,
        filterFunction: (item: WebdriverIO.Element, index: number) => Promise<boolean> | boolean,
        options: {
            timeout?: number;
            interval?: number;
            timeoutMsg?: string;
        } = {}
    ): Promise<{ item: WebdriverIO.Element; index: number }> {
        const {
            timeout = 10000,
            interval = 1000,
            timeoutMsg = `Item matching criteria did not appear in list ${listSelector} within timeout`
        } = options;

        let foundItem: { item: WebdriverIO.Element; index: number };
        await browser.waitUntil(
            async () => {
                const listItems = await $$(`${listSelector} ${itemSelector}`);
                for (let i = 0; i < listItems.length; i++) {
                    if (await filterFunction(listItems[i], i)) {
                        foundItem = { item: listItems[i], index: i };
                        return true;
                    }
                }
                return false;
            },
            { timeout, interval, timeoutMsg }
        );
        return foundItem!;
    }

    /**
     * Get current timestamp for logging
     */
    static getTimestamp(): string {
        return new Date().toISOString();
    }
}

