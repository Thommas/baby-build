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
import { BuildService, ChildService } from '../../../services';

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
    private apollo: Apollo,
    public childService: ChildService,
    public buildService: BuildService
  ) {}

  ngOnInit() {
    if (this.childService.child) {
      this.getBuilds();
    }
  }

  getBuilds() {
    this.apollo.watchQuery<any>({
      query: GetBuilds,
      variables: {
        child_id: this.childService.child.id
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.builds = data.builds;
      });
  }

  selectBuild(build) {
    this.buildService.setBuild(build);
    this.router.navigate(['build/overview']);
  }
}
