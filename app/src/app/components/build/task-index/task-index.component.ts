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
import { GetTasks, GetBuild, CreateTaskMutation } from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-task-index-cmp',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.scss']
})
export class TaskIndexComponent implements OnInit {
  loading: boolean;
  buildId: string;
  selectedTask: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.buildId = null;
    this.selectedTask = null;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getBuild(params.buildId);
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
          this.buildId = buildId;
          this.userService.setCurrentBuildId(this.buildId);
        },
        (e) => console.log(['/page-not-found'])
      )
  }

  addTask() {
    if (!this.buildId) {
      return;
    }
    const task = {
      buildId: this.buildId
    };
    this.apollo.mutate({
      mutation: CreateTaskMutation,
      variables: {
        buildId: this.buildId
      },
      refetchQueries: [{
        query: GetTasks,
        variables: {
          buildId: this.buildId,
          parentId: null
        }
      }]
    }).subscribe();
  }

  selectTask(task) {
    this.selectedTask = task;
  }
}
