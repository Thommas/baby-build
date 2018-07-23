/**
 * Path of child
 *
 * App
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import {
  AngularticsService,
  AuthService,
  BrowserService,
  ProgressService,
  LocaleService,
  UserService
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer;

  /**
   * Constructor
   */
  constructor(
    public router: Router,
    private authService: AuthService,
    private browserService: BrowserService,
    private localeService: LocaleService,
    public progressService: ProgressService,
    private userService: UserService,
    private angularticsService: AngularticsService,
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
  ) {}

  ngOnInit() {
    this.authService.init();
    this.angularticsService.init();
    this.userService.init();

    if (this.router.events) {
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        if (this.browserService.document) {
          this.browserService.document.documentElement.scrollTop = 0;
        }
      });
    }
  }

  toggleDrawer() {
    this.drawer.toggle();
  }
}
