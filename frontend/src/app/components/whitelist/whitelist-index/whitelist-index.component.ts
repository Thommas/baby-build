/**
 * Path of child
 *
 * Component - Whitelist - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import swal from 'sweetalert2';
import { clone } from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { GetWhitelistItems, DeleteWhitelistItem } from '../../../graphql';
import { BuildService } from '../../../services';
import { WhitelistEditComponent } from '../whitelist-edit/whitelist-edit.component';

@Component({
  selector: 'app-whitelist-index-cmp',
  templateUrl: './whitelist-index.component.html',
  styleUrls: ['./whitelist-index.component.scss']
})
export class WhitelistIndexComponent implements OnInit {
  loading: boolean;
  whitelistItems: any;
  year: number;

  constructor(
    private apollo: Apollo,
    private buildService: BuildService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.year = 1;
    this.getWhitelistItems();
  }

  getWhitelistItems() {
    this.apollo.watchQuery<any>({
      query: GetWhitelistItems,
      variables: {
        build_id: this.buildService.build.id,
        year: this.year
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.whitelistItems = data.whitelistItems;
      });
  }

  editWhitelistItem(whitelistItem) {
    const dialogRef = this.dialog.open(WhitelistEditComponent, {
      data: {
        whitelistItem: whitelistItem,
        year: this.year
      }
    });
  }

  deleteWhitelistItem(whitelistItem) {
    swal({
      title: 'whitelist.delete.title',
      text: 'whitelist.delete.text',
      type: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(() => {
      this.confirmDeleteWhitelistItem(whitelistItem);
    }).catch((reason) => {
      // Nothing
    });
  }

  confirmDeleteWhitelistItem(whitelistItem) {
    this.apollo.mutate({
      mutation: DeleteWhitelistItem,
      variables: {
        id: whitelistItem.id
      },
      refetchQueries: [{
        query: GetWhitelistItems,
        variables: {
          build_id: this.buildService.build.id,
          year: this.year
        },
      }],
    }).subscribe();
  }
}
