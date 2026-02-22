Feature: Retirement Calculator Form Submission

Scenario Outline: User submits retirement calculator form with different SSB and PRI settings
    Given I open the retirement calculator page
    And I close the popup if displayed
    And I fill in the retirement form
    When I click on Adjust default values link
    And I update the default calculator fields with SSB "<SSB>" and PRI inflation "<PRI>"
    And I submit the form
    Then I should see the retirement results

 Examples:
    | SSB  | PRI |
    | Yes  | Yes |
    | Yes  | No  |
    | No   | Yes |
    | No   | No  |