/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-security-callback-cmp',
  templateUrl: './callback.html',
  styleUrls: ['./callback.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      this.authService.resumeAuth(fragment);
    });
  }
}
