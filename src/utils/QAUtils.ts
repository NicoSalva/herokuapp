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
   * Wait for Angular to be ready
   */
  static async waitForAngularReady(timeout: number = 15000): Promise<void> {
    await browser.waitUntil(
      async () => {
        const angularReady = await browser.execute(() => {
          return (
            typeof (window as any).angular !== 'undefined' &&
            document.querySelector('[ng-controller]') !== null
          );
        });
        return angularReady;
      },
      {
        timeout,
        timeoutMsg: 'Angular did not load properly',
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
        timeoutMsg: 'AJAX requests did not complete within timeout',
      }
    );
  }

  /**
   * Wait for page to load completely
   */
  static async waitForPageLoad(): Promise<void> {
    await browser.waitUntil(() => browser.execute(() => document.readyState === 'complete'), {
      timeout: 10000,
      timeoutMsg: 'Page did not load completely',
    });
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
      timeoutMsg = 'Condition was not met within timeout',
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
   * Wait until a specific item appears in a list with custom filtering
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
      timeoutMsg = `Item matching criteria did not appear in list ${listSelector} within timeout`,
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
}
