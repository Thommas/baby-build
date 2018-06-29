/**
 * Path of child
 *
 * Component - Header
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { AuthService, BuildService, ChildService } from '../../../services';

@Component({
  selector: 'app-header-cmp',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    public buildService: BuildService,
    public childService: ChildService
  ) {}
}
