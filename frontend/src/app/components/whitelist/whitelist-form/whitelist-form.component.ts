/**
 * Path of child
 *
 * Component - Whitelist - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  @ViewChild('whitelistItemForm') whitelistItemForm: any;
  @Input() category: string;
  requiredAgeControl: FormControl = new FormControl('', [
    Validators.min(0),
    Validators.max(25)
  ])
  whitelistItem: any;
  loading: boolean;

  constructor(private router: Router, private apollo: Apollo) {
    this.whitelistItem = {};
  }

  submit() {
    console.log('whitelistItemForm', this.whitelistItemForm.valid);
    return;
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
