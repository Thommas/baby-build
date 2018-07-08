/**
 * Path of child
 *
 * Component - Task - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone, isEmpty } from 'lodash';
import { Component, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  GetAuthUser,
  CreateTaskMutation,
  UpdateTaskMutation,
  GetTasks
} from '../../../graphql';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-task-item-cmp',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnChanges {
  @Input() task: any;
  formGroup: FormGroup;
  loading: boolean;

  constructor(private apollo: Apollo, private buildService: BuildService) {
    this.task = {};
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', [Validators.required])
    });
    this.formGroup.setValue({
      id: null,
      name: ''
    });
  }

  ngOnChanges() {
    if (!isEmpty(this.task)) {
      this.formGroup.setValue({
        id: this.task.id,
        name: this.task.name
      });
    }
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    const task = clone(this.formGroup.value);
    this.apollo.mutate({
      mutation: task.id ? UpdateTaskMutation : CreateTaskMutation,
      variables: {
        ...task
      }
    }).subscribe();
  }
}
