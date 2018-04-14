/**
 * Path of child
 *
 * Component - Favorite - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import swal from 'sweetalert2';
import { clone } from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { GetFavorites, DeleteFavorite } from '../../../graphql';
import { BuildService } from '../../../services';
import { FavoriteEditComponent } from '../favorite-edit/favorite-edit.component';

@Component({
  selector: 'app-favorite-index-cmp',
  templateUrl: './favorite-index.component.html',
  styleUrls: ['./favorite-index.component.scss']
})
export class FavoriteIndexComponent implements OnInit {
  loading: boolean;
  favorites: any;
  child_year: number;

  constructor(
    private apollo: Apollo,
    private buildService: BuildService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.child_year = 1;
    this.getFavorites();
  }

  getFavorites() {
    this.apollo.watchQuery<any>({
      query: GetFavorites,
      variables: {
        build_id: this.buildService.build.id,
        child_year: this.child_year
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.favorites = data.favorites;
      });
  }

  editFavorite(favorite) {
    const dialogRef = this.dialog.open(FavoriteEditComponent, {
      data: {
        favorite: favorite,
        child_year: this.child_year
      }
    });
  }

  deleteFavorite(favorite) {
    swal({
      title: 'favorite.delete.title',
      text: 'favorite.delete.text',
      type: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(() => {
      this.confirmDeleteFavorite(favorite);
    }).catch((reason) => {
      // Nothing
    });
  }

  confirmDeleteFavorite(favorite) {
    this.apollo.mutate({
      mutation: DeleteFavorite,
      variables: {
        id: favorite.id
      },
      refetchQueries: [{
        query: GetFavorites,
        variables: {
          build_id: this.buildService.build.id,
          child_year: this.child_year
        },
      }],
    }).subscribe();
  }
}
