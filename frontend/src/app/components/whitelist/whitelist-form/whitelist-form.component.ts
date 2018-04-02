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
import { Apollo } from 'apollo-angular';
import {
  GetAuthUser,
  CreateWhitelistItemMutation,
  UpdateWhitelistItemMutation,
  GetWhitelistItems
} from '../../../graphql';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-whitelist-form-cmp',
  templateUrl: './whitelist-form.component.html',
  styleUrls: ['./whitelist-form.component.scss']
})
export class WhitelistFormComponent implements OnChanges {
  @Output('success') success: EventEmitter<any> = new EventEmitter<any>();
  @Input() whitelistItem: any;
  year: number;
  formGroup: FormGroup;
  loading: boolean;
  categories: any = [
    'activity',
    'sport',
    'book',
    'movie',
    'tvshow',
    'anime',
    'video',
    'videogame',
    'toy'
  ];

  constructor(private apollo: Apollo, private buildService: BuildService) {
    this.whitelistItem = {};
    this.year = null;
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      title: new FormControl('', [Validators.required]),
    });
    this.formGroup.setValue({
      id: null,
      title: ''
    });
  }

  ngOnChanges() {
    if (!isEmpty(this.whitelistItem)) {
      this.formGroup.setValue({
        id: this.whitelistItem.id,
        title: this.whitelistItem.title
      });
    }
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    const whitelistItem = clone(this.formGroup.value);
    whitelistItem.build_id = this.buildService.build.id;
    this.apollo.mutate({
      mutation: whitelistItem.id ? UpdateWhitelistItemMutation : CreateWhitelistItemMutation,
      variables: {
        ...whitelistItem
      },
      refetchQueries: [
        {
          query: GetAuthUser,
        },
        {
          query: GetWhitelistItems,
          variables: {
            build_id: this.buildService.build.id,
            year: this.year
          },
        }
      ],
    }).subscribe(
      res => this.success.emit({})
    );
  }
}
