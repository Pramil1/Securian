Feature: Pre-retirement Calculator

  Scenario: Fill the calculator and keep browser open
    Given I open the pre-retirement calculator page
    When I close the popup if it appears
    And I fill in the calculator fields
    And I click the Calculate button
    Then I should keep the browser open