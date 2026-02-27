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