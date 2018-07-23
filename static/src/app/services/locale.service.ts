/**
 * Path of child
 *
 * Service - Locale
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

    if (!this.browserService.window) {
      return;
    }
    this.browserService.window.location.href = environment.baseDomainUrl + '/' + newLocale;
  }

  public get locales() {
    return this.LOCALES;
  }
}
