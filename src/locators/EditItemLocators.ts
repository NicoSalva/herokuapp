import { BaseLocators } from './BaseLocators.js'

/**
 * Edit Item Page Locators
 * Contains all selectors for the Edit Item page
 */
export class EditItemLocators extends BaseLocators {
    // Desktop selectors
    private readonly desktopSelectors = {
        // Form elements
        formSection: 'form[name="strangerlist.detailsForm"]',
        textarea: 'textarea[name="text"]',
        imageInput: 'input[type="file"][id="inputImage"]',
        updateButton: 'button[ng-click*="updateItem"]',
        cancelButton: 'button[ng-click*="cancel"]',
        
        // Common elements
        loadingSpinner: '[data-testid="loading"]',
        errorMessage: '[data-testid="error"]',
        successMessage: '[data-testid="success"]'
    }

    // Mobile selectors (can be different if needed)
    private readonly mobileSelectors = {
        // Form elements (same as desktop for this app)
        formSection: 'form[name="strangerlist.detailsForm"]',
        textarea: 'textarea[name="text"]',
        imageInput: 'input[type="file"][id="inputImage"]',
        updateButton: 'button[ng-click*="updateItem"]',
        cancelButton: 'button[ng-click*="cancel"]',
        
        // Common elements
        loadingSpinner: '[data-testid="loading"]',
        errorMessage: '[data-testid="error"]',
        successMessage: '[data-testid="success"]'
    }

    /**
     * Get all selectors for the current device
     */
    getSelectors(): Record<string, string> {
        // For now, return desktop selectors
        // In the future, this can be enhanced to detect device type
        return this.desktopSelectors;
    }

    /**
     * Get specific selector by name
     */
    getSelector(name: keyof typeof this.desktopSelectors): string {
        const selectors = this.getSelectors();
        return selectors[name] || '';
    }

    /**
     * Get form section selector
     */
    get formSection(): string {
        return this.getSelector('formSection');
    }

    /**
     * Get textarea selector
     */
    get textarea(): string {
        return this.getSelector('textarea');
    }

    /**
     * Get image input selector
     */
    get imageInput(): string {
        return this.getSelector('imageInput');
    }

    /**
     * Get update button selector
     */
    get updateButton(): string {
        return this.getSelector('updateButton');
    }

    /**
     * Get cancel button selector
     */
    get cancelButton(): string {
        return this.getSelector('cancelButton');
    }

    /**
     * Get loading spinner selector
     */
    get loadingSpinner(): string {
        return this.getSelector('loadingSpinner');
    }

    /**
     * Get error message selector
     */
    get errorMessage(): string {
        return this.getSelector('errorMessage');
    }

    /**
     * Get success message selector
     */
    get successMessage(): string {
        return this.getSelector('successMessage');
    }
}
