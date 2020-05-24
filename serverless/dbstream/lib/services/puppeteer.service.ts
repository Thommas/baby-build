/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import moment from 'moment';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

function delay(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms) })
}

class PuppeteerService {
  constructor() {
    puppeteer.use(StealthPlugin());
  }

  async getBrowser() {
    return await puppeteer.launch({
      headless: true
    });
  }

  async getNewPage(browser: any) {
    const page = await browser.newPage();

    await page.setViewport({
      width: 1024,
      height: 1024
    });

    return page;
  }

  async getOriginalImageUrl(page: any, imageSelector: string) {
    await page.evaluate((sel) => {
      if (document.querySelector(sel)) {
        document.querySelector(sel).click();
      }
    }, imageSelector);

    await delay(1000);

    const ORIGINAL_IMAGE_SELECTOR = `#islsp img`;
    return await page.evaluate((sel) => {
      return document.querySelector(sel) ? document.querySelector(sel).getAttribute('src') : null;
    }, ORIGINAL_IMAGE_SELECTOR);
  }

  async fetchImgs(input: string, limit: number = 1, getOriginal: boolean = false): Promise<string[]> {
    const browser = await this.getBrowser();
    const page = await this.getNewPage(browser);

    await page.goto(`https://www.google.com/search?tbm=isch&q=${input}`);

    const imgs: string[] = [];

    for (let i = 0; i < limit; i++) {
      const imageSelector = `#islrg > div:nth-child(1) > div:nth-child(${i + 1}) > a > div > img`;
      if (getOriginal) {
        const originalImageUrl = await this.getOriginalImageUrl(page, imageSelector);

        if (originalImageUrl) {
          imgs.push(originalImageUrl);
        }
      } else {
        const img = await page.evaluate((sel) => {
          return document.querySelector(sel) ? document.querySelector(sel).getAttribute('src') : null;
        }, imageSelector);

        if (img) {
          imgs.push(img);
        }
      }
    }

    await browser.close();

    return imgs;
  }

  async fetchReleaseDate(input: string): Promise<number|null> {
    const browser = await this.getBrowser();
    const page = await this.getNewPage(browser);

    await page.goto(`https://www.google.com/search?q=${input}+release+date`);

    await delay(1000);

    const RELEASE_DATE_SELECTOR = `#rso [data-attrid="hw:/collection/video_games:published date"]`;
    const releaseDate = await page.evaluate((sel) => {
      return document.querySelector(sel) ? document.querySelector(sel).innerText : null;
    }, RELEASE_DATE_SELECTOR);

    await page.screenshot({path: 'example.png'});

    await browser.close();

    return releaseDate ? moment(releaseDate, "DD MMMM YYYY").year() : null;
  }
}

export const puppeteerService = new PuppeteerService();
