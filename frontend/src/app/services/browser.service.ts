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

declare const window: any;
declare const document: any;

@Injectable()
export class BrowserService {
  /**
   * Get browser window
   */
  get window(): any {
    return window;
  }

  /**
   * Get browser document
   */
  get document(): any {
    return document;
  }
}
