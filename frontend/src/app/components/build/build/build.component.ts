/**
 * Path of child
 *
 * Component - Build - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';

import { AuthService } from '../../../services';

@Component({
  selector: 'app-build-cmp',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent {
  /**
   * Constructor
   */
  constructor(protected authService: AuthService) {
  }
}
