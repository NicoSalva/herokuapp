Feature: Create Item
  As a user
  I want to create new items in the Stranger List
  So that I can add my own content to the list

  Scenario: Create a new item successfully
    Given I am on the Stranger List application
    When I enter "This is a test item created by automation" in the description field
    And I click the Create Item button
    Then I should see the new item in the list
    And the item should contain the text "This is a test item created by automation"
