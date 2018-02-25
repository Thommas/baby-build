/**
 * Path of child
 *
 * Component - Build - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';

import { AuthService } from '../../../services';

@Component({
  selector: 'app-build-show-cmp',
  templateUrl: './build-show.component.html',
  styleUrls: ['./build-show.component.scss']
})
export class BuildShowComponent {
  /**
   * Constructor
   */
  constructor(protected authService: AuthService) {
  }
}
