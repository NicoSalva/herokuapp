export const TestData = {
    // Items for testing
    items: {
        newItem: {
            title: 'Automation Test Item',
            description: 'This item was created by automated testing suite'
        },
        editItem: {
            title: 'Edited Automation Item',
            description: 'This item has been modified by automation'
        },
        longDescriptionItem: {
            title: 'Long Description Test',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(50) // ~2000 characters
        }
    },
    
    // Expected text to verify
    expectedTexts: {
        creatorsItem: 'Creators: Matt Duffer, Ross Duffer',
        successMessage: 'Item created successfully',
        editSuccessMessage: 'Item updated successfully',
        deleteSuccessMessage: 'Item deleted successfully'
    },
    
    // Validation data
    validation: {
        maxDescriptionLength: 1000,
        minTitleLength: 1,
        maxTitleLength: 100
    }
}

