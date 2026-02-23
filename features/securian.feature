Feature: Retirement Calculator Form Submission

  Scenario: User submits retirement calculator form with SSB- No, PRI increase with Inflation-Yes
    Given I open the retirement calculator page
    And I close the popup if displayed
    And I fill in the retirement form
    When I click on Adjust default values link
    And I update the default calculator fields with SSB "No" and PRI inflation "Yes"
    And I submit the form
    Then I should see the retirement results


  Scenario: User submits retirement calculator form with SSB- Yes, PRI increase with Inflation-Yes
    Given I open the retirement calculator page
    And I close the popup if displayed
    And I fill in the retirement form 
    When I click on Adjust default values link
   And I update the default calculator fields with SSB "Yes" and PRI inflation "Yes"
    And I submit the form
    Then I should see the retirement results


   