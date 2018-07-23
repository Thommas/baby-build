/**
 * Path of child
 *
 * Component - Header
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { BrowserService } from '../../services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header-cmp',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private browserService: BrowserService
  ) {}

  login() {
    if (!this.browserService.window) {
      return;
    }
    this.browserService.window.location.href = environment.appUrl;
  }
}
