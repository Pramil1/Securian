import { Given, When, Then } from '@wdio/cucumber-framework';
import RetirementPage from '../pageobjects/retirement.page';
import { expect } from '@wdio/globals';

const retirementPage = new RetirementPage();

Given('I open the retirement calculator page', async () => {
    await retirementPage.open();
});

When('I close the popup if displayed', async () => {
    await retirementPage.closePopupIfDisplayed();
});

When('I click on Adjust default values link', async () => {
    await retirementPage.clickAdjustDefaultValues();
});


When('I update the default calculator fields', async () => {
    await retirementPage.updateDefaultCalculatorValues();
});

When('I fill in the retirement form', async () => {
    await retirementPage.fillForm();
});

When('I submit the form', async () => {
    await retirementPage.submitForm();
});

Then('I should see the retirement results', async () => {
    await expect(retirementPage.resultsSection).toBeDisplayed();
});