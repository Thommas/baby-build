/**
 * Path of child
 *
 * Component - Header - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as moment from 'moment';
import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services';
import { Apollo } from 'apollo-angular';
import { GetChild } from '../../../graphql';

@Component({
  selector: 'app-header-build-cmp',
  templateUrl: './header-build.component.html',
  styleUrls: ['./header-build.component.scss']
})
export class HeaderBuildComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
  }

  ngOnInit() {
  }
}
