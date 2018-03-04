/**
 * Path of child
 *
 * Component - Header - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as moment from 'moment';
import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, ChildService } from '../../../services';
import { Apollo } from 'apollo-angular';
import { GetChild } from '../../../graphql';

@Component({
  selector: 'app-header-child-cmp',
  templateUrl: './header-child.component.html',
  styleUrls: ['./header-child.component.scss']
})
export class HeaderChildComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public childService: ChildService,
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
  }

  ngOnInit() {
  }
}
