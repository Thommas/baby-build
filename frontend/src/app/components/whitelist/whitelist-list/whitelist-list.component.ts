/**
 * Path of child
 *
 * Component - Whitelist - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GetWhitelistItems } from '../../../graphql';

@Component({
  selector: 'app-whitelist-list-cmp',
  templateUrl: './whitelist-list.component.html',
  styleUrls: ['./whitelist-list.component.scss']
})
export class WhitelistListComponent implements OnInit {
  displayedColumns = ['title', 'required_age'];
  @Input() category: string;
  loading: boolean;
  dataSource: any;
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
        this.dataSource = new MatTableDataSource<Element>(this.whitelistItems);
      });
  }
}

export interface Element {
  id: number;
  title: string;
  required_age: number;
}
