/**
 * Path of build
 *
 * Component - Build - Build Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GetBuilds } from '../../../graphql';

@Component({
  selector: 'app-build-index-cmp',
  templateUrl: './build-index.component.html',
  styleUrls: ['./build-index.component.scss']
})
export class BuildIndexComponent implements OnInit {
  loading: boolean;
  builds: any;

  constructor(
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.getBuilds();
  }

  getBuilds() {
    this.apollo.watchQuery<any>({
      query: GetBuilds
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.builds = data.builds;
      });
  }
}
