import { browser } from '@wdio/globals'
import { $ } from '@wdio/globals'
import { jsClick } from '../utilities/utility';
import testData from '../data/testData.json';
import { setCurrencyInput } from '../utilities/utility';

export interface RetirementCalculatorData {
    currentAge?: string;
    retirementAge?: string;
    currentAnnualIncome?: string;
    spouseAnnualIncome?: string;
    currentSavings?: string;
    currentAnnualSavings?: string;
    savingsIncreaseRate?: string;
    socialSecurityOverride?: string;
}

export interface DefaultCalculatorData {
    otherIncome?: string;
    retirementYears?: string;
    inflationRate?: string;
    incomeReplacementRate?: string;
    preRetirementReturn?: string;
    postRetirementReturn?: string;
}

export const DEFAULT_RETIREMENT_DATA: RetirementCalculatorData = testData.retirementCalculator as RetirementCalculatorData;
export const DEFAULT_CALCULATOR_ADJUSTMENTS: DefaultCalculatorData = testData.calculatorAdjustments as DefaultCalculatorData;

export default class SecurianPage {

    public async open() {
    await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html')
       await browser.maximizeWindow();
        await browser.pause(3000);
    } 

   public get popupCloseBtn() {
    return $('button[aria-label="Close"]');
    }

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

    async fillForm(data: RetirementCalculatorData = DEFAULT_RETIREMENT_DATA) {
        const mergedData = { ...DEFAULT_RETIREMENT_DATA, ...data };
        
        const currentAge = this.currentAge;
        await setCurrencyInput(currentAge, mergedData.currentAge!);

        const retirementAge = this.retirementAge;
        await setCurrencyInput(retirementAge, mergedData.retirementAge!);

        const cannualIncome = this.cannualIncome;
        await setCurrencyInput(cannualIncome, mergedData.currentAnnualIncome!);
        await browser.pause(3000);

        const sannualIncome = this.sannualIncome;
        await setCurrencyInput(sannualIncome, mergedData.spouseAnnualIncome!);   
        await browser.pause(3000);

        const currentrSavings = this.currentrSavings;
        await setCurrencyInput(currentrSavings, mergedData.currentSavings!);
        await browser.pause(3000);
        
        const currenteachSavings = this.currenteachSavings;
        await setCurrencyInput(currenteachSavings, mergedData.currentAnnualSavings!);
        await browser.pause(3000);
        
        const savingIncrease = this.savingIncrease;
        await setCurrencyInput(savingIncrease, mergedData.savingsIncreaseRate!);
        await browser.pause(3000);

        const ssoAmount = this.ssoAmount;
        await setCurrencyInput(ssoAmount, mergedData.socialSecurityOverride!);
        await browser.pause(3000);
    }

    async clickAdjustDefaultValues() {
        await this.adjustDefaultsLink.waitForClickable({ timeout: 5000 });
        await this.adjustDefaultsLink.click();  
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

    async updateDefaultCalculatorValues(data: DefaultCalculatorData = DEFAULT_CALCULATOR_ADJUSTMENTS) {
        const mergedData = { ...DEFAULT_CALCULATOR_ADJUSTMENTS, ...data };

        const otherIncome = this.otherIncome;
        await setCurrencyInput(otherIncome, mergedData.otherIncome!); 
        await browser.keys('Tab');
        const val = await otherIncome.getValue();
        console.log('Other income value:', val);  
        await browser.pause(500);

        const retirementYears = this.retirementYears;
        await setCurrencyInput(retirementYears, mergedData.retirementYears!);
        await browser.pause(500);       

       
        if (!(await this.inflationYesRadio.isSelected())) {
            await jsClick(this.inflationYesRadio);
        }
          
         const inflationRate = this.inflationRate;
        await setCurrencyInput(inflationRate, mergedData.inflationRate!); 
        await browser.pause(3000);

        const incomeReplacementRate = this.incomeReplacementRate;
        await setCurrencyInput(incomeReplacementRate, mergedData.incomeReplacementRate!); 
        await browser.pause(3000);

       const preRetirementReturn = this.preRetirementReturn;
        await setCurrencyInput(preRetirementReturn, mergedData.preRetirementReturn!); 
        

        const postRetirementReturn = this.postRetirementReturn;
        await setCurrencyInput(postRetirementReturn, mergedData.postRetirementReturn!); 

        await jsClick(this.saveChangesBtn);
        await browser.pause(500);
    }

    async submitForm() {
        await jsClick(this.calculateBtn);
        await browser.pause(30000);
        await this.resultsSection.waitForDisplayed({ timeout: 60000 });
    }

      async isResultsDisplayed(): Promise<boolean> {
        await this.resultsSection.waitForDisplayed({ timeout: 10000 });
        return this.resultsSection.isDisplayed(); 
    }
}