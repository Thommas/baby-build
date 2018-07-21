/**
 * Path of child
 *
 * Component - Task - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import swal from 'sweetalert2';
import { clone } from 'lodash';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { GetTasks, GetBuild, CreateTaskMutation } from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-task-list-cmp',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnChanges {
  @Input('buildId') buildId: string;
  @Input('parentId') parentId: string;
  @Output('selectTask') selectTask: EventEmitter<any> = new EventEmitter<any>();
  loading: boolean;
  tasks: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.buildId = null;
    this.parentId = null;
  }

  ngOnInit() {
    this.getTasks();
  }

  ngOnChanges() {
    console.log('ON CHANGES');
    this.getTasks();
  }

  getTasks() {
    this.loading = true;

    console.log('getTasks');
    console.log('this.buildId', this.buildId);
    console.log('this.parentId', this.parentId);

    this.apollo.watchQuery<any>({
      query: GetTasks,
      fetchPolicy: 'network-only',
      variables: {
        buildId: this.buildId,
        parentId: this.parentId
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
