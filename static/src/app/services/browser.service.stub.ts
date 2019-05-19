/**
 * Path of child
 *
 * Service - Browser - Stub
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';

@Injectable()
export class BrowserServiceStub {
  /**
   * Get browser window
   */
  get window(): any {
    return {};
  }

  /**
   * Get browser document
   */
  get document(): any {
    return {};
  }
}
