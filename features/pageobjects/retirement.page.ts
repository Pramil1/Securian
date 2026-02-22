import { browser } from '@wdio/globals'
import { $ } from '@wdio/globals'

export default class RetirementPage {

    public async open() {
    await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html')
       await browser.maximizeWindow();
        await browser.pause(3000);
    } 

   public get popupCloseBtn() {
    return $('button[aria-label="Close"]');
    }

    // Form Fields (Update selectors based on actual DOM)
    public get currentAge() {
        return $('#current-age');
    }

    public get retirementAge() {
        return $('#retirement-age');
    }

    public get cannualIncome() {
        return $('#current-income');
    }

    public get sannualIncome() {
        return $('#spouse-income');
    }

    public get currentrSavings() {
        return $('#current-total-savings');
    }

     public get currenteachSavings() {
        return $('#current-annual-savings');
    }

    public get savingIncrease() {
        return $('#savings-increase-rate');
    }

     get adjustDefaultsLink() {
        return $('//a[contains(text(),"Adjust default values")]');
    }

    // Default calculator values
    get otherIncome() {
        return $('#additional-income');
    }

    get retirementYears() {
        return $('#retirement-duration');
    }

    get inflationYesRadio() {
        return $('label[for="include-inflation"]');
    }

    get inflationRate() {
        return $('#expected-inflation-rate');
    }

    get incomeReplacementRate() {
        return $('#retirement-annual-income');
    }

    get preRetirementReturn() {
        return $('#pre-retirement-roi');
    }

    get postRetirementReturn() {
        return $('#post-retirement-roi');
    }

    get saveChangesBtn() {
        return $('//button[contains(text(),"Save changes")]');
    }

    public get calculateBtn() {
        return $('button[data-tag-id="submit"]');
    }

    public get resultsSection() {
        return $('#calculator-results-container');
    }

    async closePopupIfDisplayed() {
        if (await this.popupCloseBtn.isDisplayed().catch(() => false)) {
            await this.popupCloseBtn.click();
        }
    }

     /* ================== Utility ================== */

    private async setInput(element: ChainablePromiseElement, value: string) {
    
        await element.waitForDisplayed({ timeout: 5000 });
        await element.scrollIntoView();
        await element.click();              // IMPORTANT for input mask
        await element.clearValue();         // clear default $0
        await element.setValue(value);
    }

    

    async fillForm() {
        await this.currentAge.setValue('40');
        await this.retirementAge.setValue('68');

        const cannualIncome = this.cannualIncome;
        await this.setInput(cannualIncome, '100000');   // now it works
        await browser.pause(3000);

        const sannualIncome = this.sannualIncome;
        await this.setInput(sannualIncome, '75000');   // now it works
        await browser.pause(3000);

        const currentrSavings = this.currentrSavings;
        await this.setInput(currentrSavings, '500000');
        await browser.pause(3000);
        
        await this.currenteachSavings.setValue('10');
        await browser.pause(3000);
        
        await this.savingIncrease.setValue('25');
        await browser.pause(3000);
    }

    async clickAdjustDefaultValues() {
        await this.adjustDefaultsLink.waitForClickable({ timeout: 5000 });
        await this.adjustDefaultsLink.click();
    }

    async updateDefaultCalculatorValues() {

        const otherIncome = this.otherIncome;
        await this.setInput(otherIncome, '1200'); 
        await browser.keys('Tab');
        const val = await otherIncome.getValue();
        console.log('Other income value:', val);  
        await browser.pause(1000);

        const retirementYears = this.retirementYears;
        await this.setInput(retirementYears, '25');   // now it works
        await browser.pause(3000);
        

        // Inflation: Yes
        if (!(await this.inflationYesRadio.isSelected())) {
            await this.inflationYesRadio.waitForClickable({ timeout: 5000 });
            await this.inflationYesRadio.scrollIntoView();
            await this.inflationYesRadio.click();

        }
          
         const inflationRate = this.inflationRate;
        await this.setInput(inflationRate, '3');   // now it works
        await browser.pause(3000);

        const incomeReplacementRate = this.incomeReplacementRate;
        await this.setInput(incomeReplacementRate, '80');   // now it works
        await browser.pause(3000);

       const preRetirementReturn = this.preRetirementReturn;
        await this.setInput(preRetirementReturn, '7');   // now it works
        await browser.pause(3000);

        const postRetirementReturn = this.postRetirementReturn;
        await this.setInput(postRetirementReturn, '5');   // now it works
        await browser.pause(3000);


        await this.saveChangesBtn.click();
    }



    async submitForm() {
        await this.calculateBtn.click();
         await browser.pause(30000);
    }

      async isResultsDisplayed(): Promise<boolean> {
        await this.resultsSection.waitForDisplayed({ timeout: 10000 });
        return this.resultsSection.isDisplayed();
    }
}


