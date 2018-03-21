/**
 * Path of child
 *
 * Service - Google reCatpcha
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class GoogleRecaptchaService {
  /**
   * Initialize google reCaptcha with variables in environment
   */
  init(body) {
    if (!environment.googleRecaptchaSiteKey) {
      return;
    }
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://www.google.com/recaptcha/api.js';
    body.appendChild(scriptElement);
  }

  get siteKey() {
    return environment.googleRecaptchaSiteKey;
  }
}
