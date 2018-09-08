/**
 * Path of child
 *
 * Component - User - Edit
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-user-edit-cmp',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  user: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private apollo: Apollo
  ) {
    this.user = {};
  }

  logout() {
    this.authService.logout();
    console.log('REDIRECT');
  }
}
