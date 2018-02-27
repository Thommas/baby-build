/**
 * Path of child
 *
 * Component - Whitelist - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone, isEmpty } from 'lodash';
import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  CreateWhitelistItemMutation,
  GetWhitelistItems
} from '../../../graphql';

@Component({
  selector: 'app-whitelist-form-cmp',
  templateUrl: './whitelist-form.component.html',
  styleUrls: ['./whitelist-form.component.scss']
})
export class WhitelistFormComponent implements OnChanges {
  @Input() whitelistItem: any;
  @Input() category: string;
  formGroup: FormGroup;
  whitelistItem: any;
  loading: boolean;

  constructor(private router: Router, private apollo: Apollo) {
    this.whitelistItem = {};
    this.formGroup = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      required_age: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(25)
      ])
    });
    this.formGroup.setValue({
      title: '',
      required_age: 12
    });
  }

  ngOnChanges() {
    if (!isEmpty(this.whitelistItem)) {
      this.formGroup.setValue({
        title: this.whitelistItem.title,
        required_age: this.whitelistItem.required_age
      });
    }
  }

  submit() {
    console.log('whitelistItem', this.whitelistItem)
    if (!this.formGroup.valid) {
      return;
    }
    let whitelistItem = clone(this.formGroup.value);
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
    }).subscribe();
  }
}
