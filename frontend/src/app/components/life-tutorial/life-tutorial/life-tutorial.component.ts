/**
 * Path of child
 *
 * Component - LifeTutorial - LifeTutorial
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';

import { AuthService } from '../../../services';

@Component({
  selector: 'app-life-tutorial-cmp',
  templateUrl: './life-tutorial.component.html',
  styleUrls: ['./life-tutorial.component.scss']
})
export class LifeTutorialComponent {
  /**
   * Constructor
   */
  constructor(protected authService: AuthService) {
  }
}
