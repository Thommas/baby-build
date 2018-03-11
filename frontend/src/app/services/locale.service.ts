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
  static const LOCALE_KEY = 'pathofchild_frontend_locale';
  static const LOCALES = [
    { value: 'en', label: 'English'},
    { value: 'fr', label: 'Français'},
    { value: 'ja', label: '日本語'}
  ];

  public constructor(private browserService: BrowserService) {}

  public detectLocale() {
    let locale = 'en';

    const localStorage = this.browserService.localStorage;
    if (localStorage && this.browserService.localStorage.getItem(ChildService.LOCALE_KEY)) {
      locale = this.browserService.localStorage.getItem(ChildService.LOCALE_KEY);
    } else if (this.browserService.language) {
      locale = this.browserService.language;
    }
    if (ChildService.LOCALES.map(locale => locale.value).indexOf(locale) === -1) {
      locale = 'en';
    }

    this.setLocale(locale);
  }

  public setLocale(newLocale) {
    const localStorage = this.browserService.localStorage;
    if (localStorage) {
      this.browserService.localStorage.setItem(ChildService.LOCALE_KEY, newLocale);
    }

    let subdomain = newLocale;
    if (subdomain === 'en') {
      subdomain = 'www';
    }
    this.browserService.window.location.href = subdomain + '.' + environment.baseDomainUrl;
  }
}
