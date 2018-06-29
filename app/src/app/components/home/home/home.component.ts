/**
 * Path of child
 *
 * Component - Home - Home
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';

import { AuthService } from '../../../services';

@Component({
  selector: 'app-home-cmp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  /**
   * Constructor
   */
  constructor(public authService: AuthService) {
  }

  isChildSelected() {
    return localStorage.getItem('child');
  }
}
