/**
 * Path of child
 *
 * Component - Topbar
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-topbar-cmp',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  constructor(
    public authService: AuthService
  ) {}
}
