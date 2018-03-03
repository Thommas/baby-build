/**
 * Path of child
 *
 * Component - Header - Parent
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
  selector: 'app-header-parent-cmp',
  templateUrl: './header-parent.component.html',
  styleUrls: ['./header-parent.component.scss']
})
export class HeaderParentComponent implements OnInit {
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
