import { ChainablePromiseElement } from 'webdriverio';

export async function jsClick(
  element: ChainablePromiseElement
) {
  const el = await element;
  await el.waitForExist({ timeout: 15000 });
  await el.scrollIntoView({ block: 'center' });
  await browser.pause(300);
  await browser.execute((e) => (e as unknown as HTMLElement).click(), el);
}

    export async function setCurrencyInput(element: ChainablePromiseElement, value: string) {
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

    export async function waitForElement(
      element: ChainablePromiseElement,
      timeout: number = 15000
    ): Promise<void> {
      const el = await element;
      await el.waitForExist({ timeout });
}
