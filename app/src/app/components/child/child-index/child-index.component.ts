/**
 * Path of child
 *
 * Component - Child - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GetChildren } from '../../../graphql';
import { ChildService } from '../../../services';

@Component({
  selector: 'app-child-index-cmp',
  templateUrl: './child-index.component.html',
  styleUrls: ['./child-index.component.scss']
})
export class ChildIndexComponent implements OnInit {
  loading: boolean;
  children: any;

  constructor(
    private router: Router,
    private apollo: Apollo,
    public childService: ChildService
  ) {}

  ngOnInit() {
    this.getChildren();
  }

  getChildren() {
    this.apollo.watchQuery<any>({
      query: GetChildren
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.children = data.children;
      });
  }

  selectChild(child) {
    this.childService.setChild(child);
  }
}
