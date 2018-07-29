/**
 * Path of child
 *
 * Component - Build - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GetBuild } from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-build-show-cmp',
  templateUrl: './build-show.component.html',
  styleUrls: ['./build-show.component.scss']
})
export class BuildShowComponent implements OnInit {
  loading: boolean;
  build: any;
  buildId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private userService: UserService
  ) {
    this.build = null;
    this.buildId = null;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.buildId = params.buildId;
      this.getBuild();
    });
  }

  getBuild() {
    this.loading = true;
    this.apollo.watchQuery<any>({
      query: GetBuild,
      variables: {
        id: this.buildId
      }
    })
      .valueChanges
      .subscribe(
        ({ data, loading }) => {
          this.userService.setCurrentBuildId(this.buildId);
          this.build = data.build;
        },
        (e) => console.log(['/page-not-found'])
      )
  }
}
