/**
 * Path of child
 *
 * Component - Child - Update
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as moment from 'moment';
import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const getChild = gql`
  query GetChild($id: ID!) {
    child(id: $id) {
      id
      firstname
      middlename
      lastname
      nickname
      birthdate
      gender
      xp
      level
    }
  }
`;

@Component({
  selector: 'app-child-update-cmp',
  templateUrl: './child-update.component.html',
  styleUrls: ['./child-update.component.scss']
})
export class ChildUpdateComponent implements OnInit {
  child: any;
  loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
    this.child = {};
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apollo.watchQuery<any>({
        query: getChild,
        variables: {
          id: params.id
        }
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;
          this.child = clone(data.child);
          this.child.birthdate = moment(this.child.birthdate, 'x');
        });
    });
  }
}
