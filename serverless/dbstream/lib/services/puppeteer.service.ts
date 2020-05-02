/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import axios from 'axios';
import * as jimp from 'jimp';
import * as puppeteer from 'puppeteer';

function delay(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms) })
}

class PuppeteerService {
  async fetchImage(input: string, limit: number = 1, getOriginal: boolean = false): Promise<string[]> {
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

      if (getOriginal) {
        await page.evaluate((sel) => {
          if (document.querySelector(sel)) {
            document.querySelector(sel).click();
          }
        }, IMAGE_SELECTOR);

        await delay(1000)

        const ORIGINAL_IMAGE_SELECTOR = `#islsp img`;
        const originalImageUrl = await page.evaluate((sel) => {
          return document.querySelector(sel) ? document.querySelector(sel).getAttribute('src') : null;
        }, ORIGINAL_IMAGE_SELECTOR);

        if (originalImageUrl) {
          imgs.push(originalImageUrl);
        }
      } else {
        const img = await page.evaluate((sel) => {
          return document.querySelector(sel) ? document.querySelector(sel).getAttribute('src') : null;
        }, IMAGE_SELECTOR);

        if (img) {
          imgs.push(img);
        }
      }
    }

    await browser.close();

    return imgs;
  }
}

export const puppeteerService = new PuppeteerService();
