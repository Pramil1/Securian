import { Given, When, Then } from '@wdio/cucumber-framework';
import SecurianPage from '../pageobjects/securian.page';
import { expect } from '@wdio/globals';

const securianPage = new SecurianPage();

Given('I open the retirement calculator page', async () => {
    await securianPage.open();
});

When('I close the popup if displayed', async () => {
    await securianPage.closePopupIfDisplayed();
});

When('I click on Adjust default values link', async () => {
    await securianPage.clickAdjustDefaultValues();

});


When(
    'I update the default calculator fields with SSB {string} and PRI inflation {string}',
    async (ssb: string, pri: string) => {
        await securianPage.updateDefaultCalculatorFields(ssb, pri); 
        //await securianPage.updateDefaultCalculatorValues();
    }
);

When('I fill in the retirement form', async () => {
    await securianPage.fillForm();
});

When('I submit the form', async () => {
    await securianPage.submitForm();
});

Then('I should see the retirement results', async () => {
    await expect(securianPage.resultsSection).toBeDisplayed();
    browser.pause(30000); // allow time to visually confirm results
});