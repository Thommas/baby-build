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

  purifyInput(input: string): string {
    return input.replace('&', 'and');
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

    const ORIGINAL_IMAGE_SELECTOR = `#islsp > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > c-wiz > div:nth-child(1) > div:nth-child(1) img`;
    let src = 'data:';
    let attempt = 0;
    while (attempt < 5000)
    {
      src = await page.evaluate((sel) => {
        return document.querySelector(sel) ? document.querySelector(sel).getAttribute('src') : null;
      }, ORIGINAL_IMAGE_SELECTOR);
      if (src) {
        if (src.substring(0, 5) !== 'data:') {
          break;
        }
      }
      attempt++;
    }

    if (src.substring(0, 5) === 'data:') {
      return '';
    }

    return src;
  }

  async fetchImgs(input: string, limit: number = 1, getOriginal: boolean = false): Promise<string[]> {
    const imgs: string[] = [];

    const browser = await this.getBrowser();
    const page = await this.getNewPage(browser);

    let url = `https://www.google.com/search?tbm=isch&q=${this.purifyInput(input)}+icon+cover`;
    if (getOriginal) {
      url = `${url}&tbs=ic%3Atrans`;
    }

    await page.goto(url);

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
    console.log('fetchReleaseDate', input);

    const browser = await this.getBrowser();
    const page = await this.getNewPage(browser);

    await page.goto(`https://www.google.com/search?q=${this.purifyInput(input)}+release+date`);

    await delay(1000);

    const RELEASE_DATE_SELECTOR = `#rso [data-attrid="hw:/collection/video_games:published date"]`;
    const releaseDate = await page.evaluate((sel) => {
      return document.querySelector(sel) ? document.querySelector(sel).innerText : null;
    }, RELEASE_DATE_SELECTOR);

    // await page.screenshot({path: 'screenshot.png'});

    await browser.close();

    return releaseDate ? moment(releaseDate, "DD MMMM YYYY").year() : null;
  }

  async getFiles(input: string): Promise<any[]> {
    console.log('getFiles', input);

    const imgs: string[] = [];

    if (!input) {
      return imgs;
    }

    const browser = await this.getBrowser();
    const page = await this.getNewPage(browser);

    let url = `https://www.google.com/search?tbm=isch&tbs=ic%3Atrans&q=${this.purifyInput(input)}`;

    await page.goto(url);

    for (let i = 0; i < 10; i++) {
      const imageSelector = `#islrg > div.islrc > div:nth-child(${i + 1}) > a > div > img`;

      const originalImageUrl = await this.getOriginalImageUrl(page, imageSelector);

      if (originalImageUrl) {
        imgs.push(originalImageUrl);
      }
    }

    await browser.close();

    return imgs;
  }
}

export const puppeteerService = new PuppeteerService();
