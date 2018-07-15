/**
 * Path of child
 *
 * Component - Header - Level
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-header-level-cmp',
  templateUrl: './header-level.component.html',
  styleUrls: ['./header-level.component.scss']
})
export class HeaderLevelComponent {
  @Input('gamification') gamification: any;
}
