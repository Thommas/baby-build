/**
 * Path of child
 *
 * Component - Build - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const getBuild = gql`
  query GetBuild($id: ID!) {
    build(id: $id) {
      id
      title
      description
      quests {
        id
        title
      }
    }
  }
`;

@Component({
  selector: 'app-build-show-cmp',
  templateUrl: './build-show.component.html',
  styleUrls: ['./build-show.component.scss']
})
export class BuildShowComponent implements OnInit {
  build: any;
  loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
    this.build = {};
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apollo.watchQuery<any>({
        query: getBuild,
        variables: {
          id: params.id
        }
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;
          this.build = clone(data.build);
        });
    });
  }
}
