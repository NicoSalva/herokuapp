Feature: Edit Item - Functional Test

  @functional @edit
  Scenario: Edit an existing item and see the updated text
    Given I am on the Stranger List application
    And I get the initial item count from the list header
    When I edit the item with text "Creators: Matt Duffer, Ross Duffer" to "Creators: Matt Duffer, Ross Duffer (edited)"
    Then I should see the item with text "Creators: Matt Duffer, Ross Duffer (edited)"

