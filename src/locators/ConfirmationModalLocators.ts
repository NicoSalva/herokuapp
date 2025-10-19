import { BaseLocators } from './BaseLocators'

/**
 * Confirmation Modal Locators
 * Contains all selectors for confirmation modals
 */
export class ConfirmationModalLocators extends BaseLocators {
    // Desktop selectors
    private readonly desktopSelectors = {
        // Modal elements
        modal: '.modal',
        modalBody: '.modal-body',
        modalTitle: '.modal-title',
        modalContent: '.modal-content',
        
        // Action buttons
        confirmButton: 'button[ng-click*="confirm"]',
        cancelButton: 'button[ng-click*="cancel"]',
        closeButton: '.close',
        
        // Common elements
        loadingSpinner: '[data-testid="loading"]',
        errorMessage: '[data-testid="error"]',
        successMessage: '[data-testid="success"]'
    }

    // Mobile selectors (can be different if needed)
    private readonly mobileSelectors = {
        // Modal elements (same as desktop for this app)
        modal: '.modal',
        modalBody: '.modal-body',
        modalTitle: '.modal-title',
        modalContent: '.modal-content',
        
        // Action buttons
        confirmButton: 'button[ng-click*="confirm"]',
        cancelButton: 'button[ng-click*="cancel"]',
        closeButton: '.close',
        
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
     * Get modal selector
     */
    get modal(): string {
        return this.getSelector('modal');
    }

    /**
     * Get modal body selector
     */
    get modalBody(): string {
        return this.getSelector('modalBody');
    }

    /**
     * Get modal title selector
     */
    get modalTitle(): string {
        return this.getSelector('modalTitle');
    }

    /**
     * Get modal content selector
     */
    get modalContent(): string {
        return this.getSelector('modalContent');
    }

    /**
     * Get confirm button selector
     */
    get confirmButton(): string {
        return this.getSelector('confirmButton');
    }

    /**
     * Get cancel button selector
     */
    get cancelButton(): string {
        return this.getSelector('cancelButton');
    }

    /**
     * Get close button selector
     */
    get closeButton(): string {
        return this.getSelector('closeButton');
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
