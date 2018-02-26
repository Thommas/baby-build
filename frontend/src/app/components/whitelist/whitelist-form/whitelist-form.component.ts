/**
 * Path of child
 *
 * Component - Whitelist - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  CreateWhitelistItemMutation,
  UpdateWhitelistItemMutation,
  GetWhitelistItems
} from '../../../graphql';

@Component({
  selector: 'app-whitelist-form-cmp',
  templateUrl: './whitelist-form.component.html',
  styleUrls: ['./whitelist-form.component.scss']
})
export class WhitelistFormComponent {
  @Input() category: string;
  whitelistItem: any;
  loading: boolean;

  constructor(private router: Router, private apollo: Apollo) {
    this.whitelistItem = {};
  }

  submit() {
    let whitelistItem = clone(this.whitelistItem);
    whitelistItem.category = this.category;
    this.apollo.mutate({
      mutation: CreateWhitelistItemMutation,
      variables: {
        ...whitelistItem
      },
      refetchQueries: [{
        query: GetWhitelistItems,
        variables: { category: this.category },
      }],
    }).subscribe(
      res => {}
    );
  }
}
