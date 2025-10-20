Feature: Check item exists in list

  @functional @exists
  Scenario: Verify item with expected text is present
    Given I am on the Stranger List application
    Then the item should contain the text "Creators: Matt Duffer, Ross Duffer"

