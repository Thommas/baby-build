/**
 * Path of child
 *
 * Component - Whitelist - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import swal from 'sweetalert2'
import { clone } from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GetWhitelistItems, DeleteWhitelistItem } from '../../../graphql';

@Component({
  selector: 'app-whitelist-list-cmp',
  templateUrl: './whitelist-list.component.html',
  styleUrls: ['./whitelist-list.component.scss']
})
export class WhitelistListComponent implements OnInit {
  displayedColumns = ['title', 'required_age'];
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
      query: GetWhitelistItems,
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
        variables: { category: this.category },
      }],
    }).subscribe();
  }
}
