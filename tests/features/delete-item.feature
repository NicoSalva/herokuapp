Feature: Delete Item - Functional Test

  @functional @delete
  Scenario: Create and delete an item in the same run
    Given I am on the Stranger List application
    And I get the initial item count from the list header
    When I create a new temporary item
    Then I should see the current item in the list
    When I delete the current item
    Then I should not see the current item

