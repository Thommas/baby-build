/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BrowserService } from './browser.service';
import { environment } from '../../environments/environment';

@Injectable()
export class LocaleService {
  private LOCALE_KEY = 'pathofchild_app_locale';
  private LOCALES = [
    { value: 'en', label: 'English'},
    { value: 'fr', label: 'Français'},
    { value: 'ja', label: '日本語'}
  ];

  public constructor(
    private browserService: BrowserService,
    private translateService: TranslateService
  ) {}

  public init() {
    this.translateService.setDefaultLang('en');

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
    this.translateService.use(newLocale);

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
