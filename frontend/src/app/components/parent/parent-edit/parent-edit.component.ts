/**
 * Path of child
 *
 * Component - Parent - Edit
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
  selector: 'app-parent-edit-cmp',
  templateUrl: './parent-edit.component.html',
  styleUrls: ['./parent-edit.component.scss']
})
export class ParentEditComponent implements OnInit {
  parent: any;
  loading: boolean;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
    this.parent = {};
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apollo.watchQuery<any>({
        query: GetChild,
        variables: {
          id: params.id
        }
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          // this.loading = loading;
          // this.child = clone(data.child);
          // this.child.birthdate = moment(this.child.birthdate, 'x');
        });
    });
  }

  logout() {
    this.authService.logout();
    console.log('REDIRECT');
  }
}
