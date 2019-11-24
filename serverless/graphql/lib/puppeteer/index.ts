/**
 * Path of child
 *
 * GraphQL - Puppeteer
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as puppeteer from 'puppeteer';

export async function fetchImage(input: string) {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 800,
    height: 800
  });

  await page.goto(`https://www.google.com/search?tbm=isch&q=${input}+symbol+logo`);

  const IMAGE_SELECTOR = '#rg > div:nth-child(1) > div:nth-child(1) > a > img';

  return await page.evaluate((sel) => {
    return document.querySelector(sel).getAttribute('src');
  }, IMAGE_SELECTOR);
}
