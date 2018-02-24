/**
 * Path of child
 *
 * Service - Security - Callback
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services';

@Component({
  selector: 'app-security-callback-cmp',
  templateUrl: './callback.html',
  styleUrls: ['./callback.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/']);
  }
}
