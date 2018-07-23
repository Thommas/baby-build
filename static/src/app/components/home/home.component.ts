/**
 * Path of child
 *
 * Component - Home
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { BrowserService, SeoService } from '../../services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-cmp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private browserService: BrowserService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.seoService.setPage('home');
  }

  signUp() {
    if (!this.browserService.window) {
      return;
    }
    this.browserService.window.location.href = environment.appUrl;
  }
}
