/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as puppeteer from 'puppeteer';

class PuppeteerService {
  async fetchImage(input: string, limit: number = 1): Promise<string[]> {
    const browser = await puppeteer.launch({
      headless: true
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 800,
      height: 800
    });

    await page.goto(`https://www.google.com/search?tbm=isch&q=${input}`);

    const imgs: string[] = [];

    for (let i = 0; i < limit; i++) {
      const IMAGE_SELECTOR = `#islrg > div:nth-child(1) > div:nth-child(${i + 1}) > a > div > img`;

      const img = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('src');
      }, IMAGE_SELECTOR);
      imgs.push(img);
    }

    await browser.close();

    return imgs;
  }
}

export const puppeteerService = new PuppeteerService();
