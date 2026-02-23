import { browser } from '@wdio/globals'
import { $ } from '@wdio/globals'
import { jsClick } from '../step-definitions/utility';

export default class SecurianPage {

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

     public get SSBYesRadio() {
        return $('label[for="yes-social-benefits"]');
    }

     public get SSBNoRadio() {
        return $('label[for="no-social-benefits"]');
    }

     public get marriedRadio() {
        return $('label[for="married"]');
    }

     public get singleRadio() {
        return $('label[for="single"]');
    }

     public get ssoAmount() {
        return $('#social-security-override');
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

     get inflationNoRadio() {
        return $('label[for="exclude-inflation"]');
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

 

   /* private async setInput(element: ChainablePromiseElement, value: string) {
    
        await element.waitForDisplayed({ timeout: 5000 });
        await element.scrollIntoView();
        await element.click();              // IMPORTANT for input mask
        await element.clearValue();         // clear default $0
        await element.setValue(value);
    }*/

    private async setCurrencyInput(element: ChainablePromiseElement, value: string) {
        const el = await element;
        await el.waitForExist({ timeout: 15000 });
        await el.scrollIntoView({ block: 'center' });
        await browser.execute(
            (input: HTMLElement, val: string) => {
                (input as HTMLInputElement).focus();
                (input as HTMLInputElement).value = val;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                (input as HTMLInputElement).blur();
            },
            el as unknown as HTMLElement,
            value
        );
    }

    

    async fillForm() {
        const currentAge = this.currentAge;
        await this.setCurrencyInput(currentAge, '40');

        const retirementAge = this.retirementAge;
        await this.setCurrencyInput(retirementAge, '68');

        const cannualIncome = this.cannualIncome;
        await this.setCurrencyInput(cannualIncome, '100000');   // now it works
        await browser.pause(3000);

        const sannualIncome = this.sannualIncome;
        await this.setCurrencyInput(sannualIncome, '75000');   // now it works
        await browser.pause(3000);

        const currentrSavings = this.currentrSavings;
        await this.setCurrencyInput(currentrSavings, '500000');
        await browser.pause(3000);
        
        const currenteachSavings = this.currenteachSavings;
        await this.setCurrencyInput(currenteachSavings, '10');
        await browser.pause(3000);
        
        const savingIncrease = this.savingIncrease;
        await this.setCurrencyInput(savingIncrease, '25');
        await browser.pause(3000);

        const ssoAmount = this.ssoAmount;
        await this.setCurrencyInput(ssoAmount, '4000');
        await browser.pause(3000);


    }

    async clickAdjustDefaultValues() {
        await this.adjustDefaultsLink.waitForClickable({ timeout: 5000 });
        await this.adjustDefaultsLink.click();

         //await jsClick(this.calculateBtn);
        //await this.resultsSection.waitForDisplayed({ timeout: 30000 });
        
    }

    public async updateDefaultCalculatorFields(ssb: string, pri: string) {
        // SSB
        if (ssb.toLowerCase() === 'yes') {
            await jsClick(this.SSBYesRadio);
        } else {
            await jsClick(this.SSBNoRadio);
        }

        // PRI inflation
        if (pri.toLowerCase() === 'yes') {
            await jsClick(this.inflationYesRadio);
        } else {
            await jsClick(this.inflationNoRadio);
        }

        await this.updateDefaultCalculatorValues();
    }

    async updateDefaultCalculatorValues() {

        const otherIncome = this.otherIncome;
        await this.setCurrencyInput(otherIncome, '1200'); 
        await browser.keys('Tab');
        const val = await otherIncome.getValue();
        console.log('Other income value:', val);  
        await browser.pause(500);

        const retirementYears = this.retirementYears;
        await this.setCurrencyInput(retirementYears, '25');   // now it works
        await browser.pause(500);
        

       
        if (!(await this.inflationYesRadio.isSelected())) {
            await jsClick(this.inflationYesRadio);
        }
          
         const inflationRate = this.inflationRate;
        await this.setCurrencyInput(inflationRate, '3');   // now it works
        await browser.pause(3000);

        const incomeReplacementRate = this.incomeReplacementRate;
        await this.setCurrencyInput(incomeReplacementRate, '80');   // now it works
        await browser.pause(3000);

       const preRetirementReturn = this.preRetirementReturn;
        await this.setCurrencyInput(preRetirementReturn, '7');   // now it works
        //await browser.pause(3000);

        const postRetirementReturn = this.postRetirementReturn;
        await this.setCurrencyInput(postRetirementReturn, '5');   // now it works
        //await browser.pause(3000);


        await jsClick(this.saveChangesBtn);
        await browser.pause(500); // allow animation to complete
    }



    async submitForm() {
        //await this.calculateBtn.click();
        //await browser.pause(30000);

        await jsClick(this.calculateBtn);
        await browser.pause(30000);
        await this.resultsSection.waitForDisplayed({ timeout: 60000 });
    }

      async isResultsDisplayed(): Promise<boolean> {
        await this.resultsSection.waitForDisplayed({ timeout: 10000 });
        return this.resultsSection.isDisplayed();

        
        
    }
}


