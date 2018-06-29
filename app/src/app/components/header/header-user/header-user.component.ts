/**
 * Path of child
 *
 * Component - Header - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { UserService } from '../../../services';

@Component({
  selector: 'app-header-user-cmp',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent {
  constructor(public userService: UserService) {}
}
