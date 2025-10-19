/**
 * Base Locators Class
 * Provides common locator functionality for mobile/desktop compatibility
 */

export abstract class BaseLocators {
    /**
     * Get device-specific selector
     * @param desktopSelector - Selector for desktop
     * @param mobileSelector - Selector for mobile (optional, defaults to desktop)
     * @returns Appropriate selector based on device type
     */
    protected getDeviceSelector(desktopSelector: string, mobileSelector?: string): string {
        // For now, we'll use the same selectors for both mobile and desktop
        // In the future, this can be enhanced to detect device type
        return mobileSelector || desktopSelector;
    }

    /**
     * Get all selectors for the current device
     * @returns Object with device-appropriate selectors
     */
    abstract getSelectors(): Record<string, string>;
}
