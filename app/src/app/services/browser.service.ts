/**
 * Path of child
 *
 * Service - Browser
 *
 * Provides global variables only accessible in a browser:
 * - document
 * - localStorage
 * - locale
 * - window
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const document: any;
declare const localStorage: any;
declare const navigator: any;
declare const window: any;

@Injectable()
export class BrowserService {
  isBrowser: boolean;

  /**
   * Constructor
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Get browser document
   */
  get document(): any {
    return this.isBrowser ? document : null;
  }

  /**
   * Get browser localStorage
   */
  get localStorage(): any {
    return this.isBrowser ? localStorage : null;
  }

  /**
   * Get browser language
   */
  get language(): any {
    if (this.isBrowser && navigator) {
      if (navigator.browserLanguage) {
        return navigator.browserLanguage.substring(0, 2);
      } else if (navigator.language) {
        return navigator.language.substring(0, 2);
      }
    }
    return null;
  }

  /**
   * Get browser window
   */
  get window(): any {
    return this.isBrowser ? window : null;
  }
}
