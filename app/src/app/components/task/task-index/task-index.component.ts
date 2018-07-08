/**
 * Path of child
 *
 * Component - Task - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import swal from 'sweetalert2';
import { clone } from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { GetTasks, GetBuild } from '../../../graphql';
import { BuildService } from '../../../services';
import { UserService } from '../../../services';

@Component({
  selector: 'app-task-index-cmp',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.scss']
})
export class TaskIndexComponent implements OnInit {
  loading: boolean;
  tasks: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private buildService: BuildService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getBuild(params.build_id);
    });
  }

  getBuild(buildId: string) {
    this.loading = true;
    this.apollo.watchQuery<any>({
      query: GetBuild,
      variables: {
        id: buildId
      }
    })
      .valueChanges
      .subscribe(
        ({ data, loading }) => {
          this.userService.setCurrentBuildId(buildId);
          this.getTasks(buildId);
        },
        (e) => console.log(['/page-not-found'])
      )
  }

  getTasks(buildId: string) {
    this.loading = true;
    this.apollo.watchQuery<any>({
      query: GetTasks,
      variables: {
        build_id: buildId
      }
    })
      .valueChanges
      .subscribe(
        ({ data, loading }) => {
          this.loading = loading;
          this.tasks = data.tasks;
        },
        (e) => console.log('error while loading tasks', e)
      )
  }
}
