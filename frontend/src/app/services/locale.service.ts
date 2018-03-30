/**
 * Path of child
 *
 * Service - Locale
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { BrowserService } from './browser.service';
import { environment } from '../../environments/environment';

@Injectable()
export class LocaleService {
  private LOCALE_KEY = 'pathofchild_frontend_locale';
  private LOCALES = [
    { value: 'en', label: 'English'},
    { value: 'fr', label: 'Français'},
    { value: 'ja', label: '日本語'}
  ];

  public constructor(private browserService: BrowserService) {}

  public init() {
    if (!this.browserService.language) {
      return;
    }
    let detectedLocale = this.browserService.language;
    if (this.LOCALES.map(locale => locale.value).indexOf(detectedLocale) === -1) {
      detectedLocale = 'en';
    }
    if (detectedLocale !== 'en') {
      this.setLocale(detectedLocale);
    }
  }

  public setLocale(newLocale) {
    let subdomain = newLocale;
    if (subdomain === 'en') {
      subdomain = '';
    } else {
      subdomain += '.';
    }
    if (!this.browserService.window) {
      return;
    }
    const host = this.browserService.window.location.host;
    const localeHost = subdomain + environment.baseDomainUrl;
    if (host !== localeHost) {
      const protocol = this.browserService.window.location.protocol;
      this.browserService.window.location.href = protocol + '//' + localeHost;
    }
  }

  public get locales() {
    return this.LOCALES;
  }
}
