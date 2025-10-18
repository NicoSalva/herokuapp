Feature: Basic Application Loading
  As a user
  I want to access the Stranger List application
  So that I can interact with the items

  Scenario: Application loads successfully
    Given I navigate to the application
    When the page loads completely
    Then I should see the "Stranger List" title
    And I should be on the correct URL
