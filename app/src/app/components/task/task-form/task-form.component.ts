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
  selector: 'app-task-form-cmp',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnChanges {
  @Output('success') success: EventEmitter<any> = new EventEmitter<any>();
  @Input() task: any;
  child_year: number;
  formGroup: FormGroup;
  loading: boolean;
  categories: any = [
    'activity',
    'sport',
    'book',
    'movie',
    'tvshow',
    'anime',
    'video',
    'videogame',
    'toy'
  ];

  constructor(private apollo: Apollo, private buildService: BuildService) {
    this.task = {};
    this.child_year = null;
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
    this.formGroup.setValue({
      id: null,
      title: '',
      category: 'activity'
    });
  }

  ngOnChanges() {
    if (!isEmpty(this.task)) {
      this.formGroup.setValue({
        id: this.task.id,
        title: this.task.title,
        category: this.task.category
      });
    }
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    const task = clone(this.formGroup.value);
    task.build_id = this.buildService.build.id;
    task.child_year = this.buildService.childYear;
    this.apollo.mutate({
      mutation: task.id ? UpdateTaskMutation : CreateTaskMutation,
      variables: {
        ...task
      },
      refetchQueries: [
        {
          query: GetAuthUser,
        },
        {
          query: GetTasks,
          variables: {
            build_id: this.buildService.build.id,
            child_year: this.buildService.childYear
          },
        }
      ],
    }).subscribe(
      res => this.success.emit({})
    );
  }
}
