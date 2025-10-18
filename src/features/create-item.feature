Feature: Create Item - Bug Detection
  As a user
  I want to create new items in the Stranger List
  So that I can add my own content to the list

  @bug-detection
  Scenario: Create Item functionality is broken (BUG DETECTED)
    Given I am on the Stranger List application
    When I enter "This is a test item created by automation" in the description field
    And I upload an image file
    And I click the Create Item button
    Then I should see the new item in the list
    And the item should contain the text "This is a test item created by automation"
    
    # NOTE: This test currently FAILS because the Create Item button does not work
    # This is a documented bug in BUG_REPORTS.md
