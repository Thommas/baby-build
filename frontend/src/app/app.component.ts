/**
 * Path of child
 *
 * App
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService, BrowserService, LocaleService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * Constructor
   */
  constructor(
    public router: Router,
    private authService: AuthService,
    private browserService: BrowserService,
    private localeService: LocaleService
  ) {
    authService.scheduleRenewal();
  }

  ngOnInit() {
    this.localeService.detectLocale();

    if (this.router.events) {
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        this.browserService.document.documentElement.scrollTop = 0;
      });
    }
  }
}
