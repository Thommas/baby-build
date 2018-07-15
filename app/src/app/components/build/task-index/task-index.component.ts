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
  tasks: any;
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
          this.getTasks();
        },
        (e) => console.log(['/page-not-found'])
      )
  }

  getTasks() {
    this.loading = true;
    this.apollo.watchQuery<any>({
      query: GetTasks,
      variables: {
        buildId: this.buildId
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
          buildId: this.buildId
        }
      }]
    }).subscribe();
  }

  selectTask(task) {
    this.selectedTask = task;
  }
}
