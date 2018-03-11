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
    let locale = 'en';

    const localStorage = this.browserService.localStorage;
    if (localStorage && this.browserService.localStorage.getItem(this.LOCALE_KEY)) {
      locale = this.browserService.localStorage.getItem(this.LOCALE_KEY);
    } else if (this.browserService.language) {
      locale = this.browserService.language;
    }
    if (this.LOCALES.map(locale => locale.value).indexOf(locale) === -1) {
      locale = 'en';
    }

    this.setLocale(locale);
  }

  public setLocale(newLocale) {
    const localStorage = this.browserService.localStorage;
    if (localStorage) {
      this.browserService.localStorage.setItem(this.LOCALE_KEY, newLocale);
    }

    let subdomain = newLocale;
    if (subdomain === 'en') {
      subdomain = 'www';
    }
    this.browserService.window.location.href = subdomain + '.' + environment.baseDomainUrl;
  }

  public get locales() {
    return this.LOCALES;
  }
}
