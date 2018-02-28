/**
 * Path of child
 *
 * Component - Whitelist - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone, isEmpty } from 'lodash';
import { Component, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
export class WhitelistFormComponent implements OnChanges {
  @Output('success') success: EventEmitter<any> = new EventEmitter<any>();
  @Input() whitelistItem: any;
  @Input() category: string;
  formGroup: FormGroup;
  loading: boolean;

  constructor(private router: Router, private apollo: Apollo) {
    this.whitelistItem = {};
    this.category = null;
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
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
      id: null,
      title: '',
      required_age: 12
    });
  }

  ngOnChanges() {
    if (!isEmpty(this.whitelistItem)) {
      this.formGroup.setValue({
        id: this.whitelistItem.id,
        title: this.whitelistItem.title,
        required_age: this.whitelistItem.required_age
      });
    }
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    let whitelistItem = clone(this.formGroup.value);
    whitelistItem.category = this.category;
    this.apollo.mutate({
      mutation: whitelistItem.id ? UpdateWhitelistItemMutation : CreateWhitelistItemMutation,
      variables: {
        ...whitelistItem
      },
      refetchQueries: [{
        query: GetWhitelistItems,
        variables: { category: this.category },
      }],
    }).subscribe(
      res => this.success.emit({})
    );
  }
}
