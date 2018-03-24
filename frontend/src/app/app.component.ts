/**
 * Path of child
 *
 * App
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import {
  AngularticsService,
  AuthService,
  BrowserService,
  ProgressService,
  LocaleService
} from './services';

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
    private localeService: LocaleService,
    private progressService: ProgressService,
    private angularticsService: AngularticsService,
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
  ) {
    authService.scheduleRenewal();
  }

  ngOnInit() {
    if (this.browserService.document) {
      this.angularticsService.init(this.browserService.document.body);
    }
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
