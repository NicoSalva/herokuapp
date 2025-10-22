import { BaseLocators } from './BaseLocators.js'

/**
 * Item List Page Locators
 * Contains all selectors for the Item List page
 */
export class ItemListLocators extends BaseLocators {
    // Desktop selectors
    private readonly desktopSelectors = {
        // Container and header
        container: '.container-fluid',
        listHeader: 'h1.ng-binding',
        
        // Item list elements
        itemList: 'li[ng-repeat="item in items"]',
        itemText: 'p.story.ng-binding',
        
        // Action buttons
        editButton: 'button[ng-click*="setCurrentItem"]',
        deleteButton: 'button[ng-click*="open"]',
        
        // Common elements
        loadingSpinner: '[data-testid="loading"]',
        errorMessage: '[data-testid="error"]',
        successMessage: '[data-testid="success"]'
    }

    // Mobile selectors (can be different if needed)
    private readonly mobileSelectors = {
        // Container and header
        container: '.container-fluid',
        listHeader: 'h1.ng-binding',
        
        // Item list elements (same as desktop for this app)
        itemList: 'li[ng-repeat="item in items"]',
        itemText: 'p.story.ng-binding',
        
        // Action buttons
        editButton: 'button[ng-click*="setCurrentItem"]',
        deleteButton: 'button[ng-click*="open"]',
        
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
     * Get container selector
     */
    get container(): string {
        return this.getSelector('container');
    }

    /**
     * Get list header selector
     */
    get listHeader(): string {
        return this.getSelector('listHeader');
    }

    /**
     * Get item list selector
     */
    get itemList(): string {
        return this.getSelector('itemList');
    }

    /**
     * Get item text selector
     */
    get itemText(): string {
        return this.getSelector('itemText');
    }

    /**
     * Get edit button selector
     */
    get editButton(): string {
        return this.getSelector('editButton');
    }

    /**
     * Get delete button selector
     */
    get deleteButton(): string {
        return this.getSelector('deleteButton');
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
