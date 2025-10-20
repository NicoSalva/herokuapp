Feature: Create Item - Functional and Validation Tests
  As a user
  I want to create new items in the Stranger List
  So that I can add my own content to the list

  @functional
  Scenario: Create Item functionality works correctly
    Given I am on the Stranger List application
    And I get the initial item count from the list header
    When I enter "This is a test item created by automation" in the description field
    And I upload an image file
    And I click the Create Item button
    Then the item count should increase by 1
    And I should see the new item in the list
    And the item should contain the text "This is a test item created by automation"

  @validation @bug-detection
  Scenario: Create Item should reject images that are not 320x320px
    Given I am on the Stranger List application
    And I get the initial item count from the list header
    When I enter "Testing image size validation" in the description field
    And I upload a small image file (100x100px)
    And I click the Create Item button
    Then the item count should NOT increase
    And I should see an error message about image size
    
    # NOTE: This test will PASS if validation works correctly (rejects small image)
    # This test will FAIL if there's a bug (accepts small image)

  @validation @bug-detection
  Scenario: Create Item should reject descriptions longer than 300 characters
    Given I am on the Stranger List application
    And I get the initial item count from the list header
    When I enter a description with 350 characters
    And I upload an image file
    Then the Create button should be disabled
    And the item count should NOT increase
    And I should see an error message about description length
 
  @validation @bug-detection
  Scenario: Create Item should reject images with wrong aspect ratio
    Given I am on the Stranger List application
    And I get the initial item count from the list header
    When I enter "Testing wrong aspect ratio" in the description field
    And I upload an image with wrong aspect ratio
    And I click the Create Item button
    Then the item count should NOT increase
    And I should see an error message about image size
    
    # NOTE: This test will PASS if validation works correctly (rejects long description)
    # This test will FAIL if there's a bug (accepts long description)
