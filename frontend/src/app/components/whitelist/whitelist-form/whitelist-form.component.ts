/**
 * Path of child
 *
 * Component - Whitelist - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const createWhitelistItemMutation = gql`
  mutation CreateWhitelistItem(
    $title: String!
    $category: String!
    $required_age: Int!
  ) {
    createWhitelistItem(
      title: $title
      category: $category
      required_age: $required_age
    ) {
      id
    }
  }
`;

const updateWhitelistItemMutation = gql`
  mutation UpdateWhitelistItem(
    $id: ID!
    $title: String!
    $category: String!
    $required_age: Int!
  ) {
    updateWhitelistItem(
      id: $id
      title: $title
      category: $category
      required_age: $required_age
    ) {
      id
    }
  }
`;

@Component({
  selector: 'app-whitelist-form-cmp',
  templateUrl: './whitelist-form.component.html',
  styleUrls: ['./whitelist-form.component.scss']
})
export class WhitelistFormComponent {
  whitelistItem: any;
  loading: boolean;

  constructor(private router: Router, private apollo: Apollo) {
    this.whitelistItem = {};
  }

  submit() {
    let whitelistItem = clone(this.whitelistItem);
    whitelistItem.category = 'book';
    this.apollo.mutate({
      mutation: createWhitelistItemMutation,
      variables: {
        ...whitelistItem
      }
    }).subscribe(
      res => {}
    );
  }
}
