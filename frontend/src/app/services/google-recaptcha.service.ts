/**
 * Path of child
 *
 * Service - Google reCatpcha
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { BrowserService } from './browser.service';
import { environment } from '../../environments/environment';

@Injectable()
export class GoogleRecaptchaService {
  callback: any;

  /**
   * Constructor
   */
  constructor(private browserService: BrowserService) {}

  /**
   * Initialize google reCaptcha with variables in environment
   */
  init(body, callback) {
    if (!environment.googleRecaptchaSiteKey) {
      return;
    }
    this.callback = callback;

    if (!this.browserService.window) {
      return;
    }
    this.browserService.window.recaptchaCallback = () => this.onRecaptchaLoaded();

    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.async = true;
    scriptElement.defer = true;
    scriptElement.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=recaptchaCallback';
    body.appendChild(scriptElement);
  }

  /**
   * When the script is loaded, render the captcha
   */
  onRecaptchaLoaded() {
    const grecaptcha = this.browserService.window.grecaptcha;
    grecaptcha.render('recaptcha-container', {
      'sitekey': environment.googleRecaptchaSiteKey,
      'callback': (response) => this.callback(response)
    });
  }
}
