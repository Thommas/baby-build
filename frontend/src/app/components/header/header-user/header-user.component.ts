/**
 * Path of child
 *
 * Component - Header - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UserService } from '../../../services';

@Component({
  selector: 'app-header-user-cmp',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }
}
