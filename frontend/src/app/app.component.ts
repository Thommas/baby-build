/**
 * Path of child
 *
 * App
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Inject, LOCALE_ID } from '@angular/core';

import { AuthService, BrowserService, ChildService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  locales = [
    { value: 'en', label: 'English'},
    { value: 'fr', label: 'Français'},
    { value: 'ja', label: '日本語'}
  ];

  /**
   * Constructor
   */
  constructor(
    @Inject(LOCALE_ID) private _locale: string,
    public authService: AuthService,
    private browserService: BrowserService,
    public childService: ChildService
  ) {
  }

  /**
   * Switch to selected locale
   */
  switchLocale(locale: any) {
    const window = this.browserService.window;
    if (window && window.location) {
      window.location.href = '/' + locale + '/';
    }
  }
}
