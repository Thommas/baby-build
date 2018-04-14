/**
 * Path of child
 *
 * Component - Favorite - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone, isEmpty } from 'lodash';
import { Component, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  GetAuthUser,
  CreateFavoriteMutation,
  UpdateFavoriteMutation,
  GetFavorites
} from '../../../graphql';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-favorite-form-cmp',
  templateUrl: './favorite-form.component.html',
  styleUrls: ['./favorite-form.component.scss']
})
export class FavoriteFormComponent implements OnChanges {
  @Output('success') success: EventEmitter<any> = new EventEmitter<any>();
  @Input() favorite: any;
  child_year: number;
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
    this.favorite = {};
    this.child_year = null;
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
    this.formGroup.setValue({
      id: null,
      title: '',
      category: 'activity'
    });
  }

  ngOnChanges() {
    if (!isEmpty(this.favorite)) {
      this.formGroup.setValue({
        id: this.favorite.id,
        title: this.favorite.title,
        category: this.favorite.category
      });
    }
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    const favorite = clone(this.formGroup.value);
    favorite.build_id = this.buildService.build.id;
    favorite.child_year = this.buildService.childYear;
    this.apollo.mutate({
      mutation: favorite.id ? UpdateFavoriteMutation : CreateFavoriteMutation,
      variables: {
        ...favorite
      },
      refetchQueries: [
        {
          query: GetAuthUser,
        },
        {
          query: GetFavorites,
          variables: {
            build_id: this.buildService.build.id,
            child_year: this.buildService.childYear
          },
        }
      ],
    }).subscribe(
      res => this.success.emit({})
    );
  }
}
