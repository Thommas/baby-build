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
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { GetTasks, DeleteTask } from '../../../graphql';
import { BuildService } from '../../../services';
import { TaskEditComponent } from '../task-edit/task-edit.component';

@Component({
  selector: 'app-task-index-cmp',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.scss']
})
export class TaskIndexComponent implements OnInit {
  loading: boolean;
  tasks: any;
  child_year: number;

  constructor(
    private apollo: Apollo,
    private buildService: BuildService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.child_year = 1;
    this.getTasks();
  }

  getTasks() {
    this.apollo.watchQuery<any>({
      query: GetTasks,
      variables: {
        build_id: this.buildService.build.id,
        child_year: this.child_year
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.tasks = data.tasks;
      });
  }

  editTask(task) {
    const dialogRef = this.dialog.open(TaskEditComponent, {
      data: {
        task: task,
        child_year: this.child_year
      }
    });
  }

  deleteTask(task) {
    swal({
      title: 'task.delete.title',
      text: 'task.delete.text',
      type: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(() => {
      this.confirmDeleteTask(task);
    }).catch((reason) => {
      // Nothing
    });
  }

  confirmDeleteTask(task) {
    this.apollo.mutate({
      mutation: DeleteTask,
      variables: {
        id: task.id
      },
      refetchQueries: [{
        query: GetTasks,
        variables: {
          build_id: this.buildService.build.id,
          child_year: this.child_year
        },
      }],
    }).subscribe();
  }
}
