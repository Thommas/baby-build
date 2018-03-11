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

  public detectLocale() {
    let locale = this.browserService.language;
    if (this.LOCALES.map(locale => locale.value).indexOf(locale) === -1) {
      locale = 'en';
    }
    if (locale !== 'en') {
      this.setLocale(locale);
    }
  }

  public setLocale(newLocale) {
    let subdomain = newLocale;
    if (subdomain === 'en') {
      subdomain = '';
    } else {
      subdomain += '.';
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
