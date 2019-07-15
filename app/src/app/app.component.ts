/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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
  @ViewChild('drawer') drawer;

  /**
   * Constructor
   */
  constructor(
    public router: Router,
    public authService: AuthService,
    private browserService: BrowserService,
    private localeService: LocaleService,
    public progressService: ProgressService,
    private angularticsService: AngularticsService,
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'recommandation_-3',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/recommandation/-3.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'recommandation_-2',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/recommandation/-2.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'recommandation_-1',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/recommandation/-1.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'recommandation_0',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/recommandation/0.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'recommandation_1',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/recommandation/1.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'recommandation_2',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/recommandation/2.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'recommandation_3',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/recommandation/3.svg')
    );
  }

  ngOnInit() {
    this.authService.init();
    this.angularticsService.init();

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
