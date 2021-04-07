/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  AngularticsService,
  AuthService,
  BrowserService,
  ProgressService
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
    public progressService: ProgressService,
    private angularticsService: AngularticsService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // this.matIconRegistry.addSvgIcon(
    //   'recommandation_-3',
    //   this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/tier/tier-d.png')
    // );
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
