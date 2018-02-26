/**
 * Path of child
 *
 * Component - Whitelist - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const getWhitelistItems = gql`
  query GetWhitelistItems($category: String!) {
    whitelistItems(category: $category) {
      id
      title
      required_age
    }
  }
`;

@Component({
  selector: 'app-whitelist-list-cmp',
  templateUrl: './whitelist-list.component.html',
  styleUrls: ['./whitelist-list.component.scss']
})
export class WhitelistListComponent implements OnInit {
  @Input() category: string;
  loading: boolean;
  whitelistItems: any;

  constructor(
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.getWhitelistItems();
  }

  getWhitelistItems() {
    this.apollo.watchQuery<any>({
      query: getWhitelistItems,
      variables: {
        category: this.category
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.whitelistItems = data.whitelistItems;
      });
  }
}
