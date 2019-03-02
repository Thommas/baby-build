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
  selector: 'app-user-sharing-cmp',
  templateUrl: './user-sharing.component.html',
  styleUrls: ['./user-sharing.component.scss']
})
export class UserSharingComponent {
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
