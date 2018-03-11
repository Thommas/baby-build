/**
 * Path of child
 *
 * Service - Browser
 *
 * Provides global variables only accessible in a browser:
 * - window
 * - document
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';

declare const document: any;
declare const localStorage: any;
declare const navigator: any;
declare const window: any;

@Injectable()
export class BrowserService {
  /**
   * Get browser document
   */
  get document(): any {
    return document;
  }

  /**
   * Get browser localStorage
   */
  get localStorage(): any {
    return localStorage;
  }

  /**
   * Get browser language
   */
  get language(): any {
    if (navigator) {
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
    return window;
  }
}
