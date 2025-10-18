Feature: Bug Fix - Create Item Functionality
  As a developer
  I want to verify that the Create Item button works correctly
  So that users can add new items to the list

  @bug-fix
  Scenario: Create Item button should create new items when bug is fixed
    Given I am on the Stranger List application
    When I enter "Test item for bug fix verification" in the description field
    And I click the Create Item button
    Then I should see the new item in the list
    And the item should contain the text "Test item for bug fix verification"
    And the item count should increase by 1
