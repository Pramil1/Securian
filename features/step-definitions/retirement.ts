import { Given, When, Then } from "@wdio/cucumber-framework";

Given("I open the pre-retirement calculator page", async () => {
    await browser.url("https://www.securian.com/insights-tools/retirement-calculator.html");
    await browser.maximizeWindow();
});

When("I close the popup if it appears", async () => {
    try {
        // Adjust the selector to match actual popup close button
        const popup = await $(".popup-close, .close-button");
        if (await popup.isDisplayed()) {
            await popup.click();
            console.log("Popup closed");
        }
    } catch (e) {
        console.log("No popup appeared");
    }
});

When("I fill in the calculator fields", async () => {
    // Fill the fields (adjust names if different in the DOM)
    const currentAge = await $("#current-age");
    await currentAge.setValue("30");

    const retirementAge = await $("#retirement-age");
    await retirementAge.setValue("65");

    const currentSavings = await $("#current-income");
    await currentSavings.setValue("20000");

    const annualSavings = await $("#spouse-income");
    await annualSavings.setValue("5000");
    const savingsIncreaseRate = await $("#current-annual-savings");
    await savingsIncreaseRate.setValue("3");

    const savingsIncrease = await $("#current-annual-savings");
    await savingsIncreaseRate.setValue("3");
});

When("I click the Calculate button", async () => {
    const calculateBtn = await $("button.calculate, button[data-tag-id='submit']");
    await calculateBtn.click();
    console.log("Clicked Calculate");
});

Then("I should keep the browser open", async () => {
    console.log("Scenario finished — browser remains open for inspection");
    // Keep browser open indefinitely (or adjust pause time)
    await browser.pause(60000); // pauses 60s; adjust as needed
});