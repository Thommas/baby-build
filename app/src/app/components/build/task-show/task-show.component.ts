/**
 * Path of child
 *
 * Component - Task - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone, isEmpty } from 'lodash';
import { Component, Inject, OnChanges, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  CreateTaskMutation,
  UpdateTaskMutation,
  GetTasks
} from '../../../graphql';

@Component({
  selector: 'app-task-show-cmp',
  templateUrl: './task-show.component.html',
  styleUrls: ['./task-show.component.scss']
})
export class TaskShowComponent implements OnChanges {
  @Input('task') task: any;
  @ViewChild('labelElement') labelElement: any;
  @ViewChild('descriptionElement') descriptionElement: any;
  formGroup: FormGroup;
  loading: boolean;

  constructor(private apollo: Apollo) {
    this.task = {};
    this.formGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      label: new FormControl('', []),
      description: new FormControl('', [])
    });
    this.formGroup.setValue({
      id: null,
      label: '',
      description: ''
    });
  }

  ngOnInit() {
    fromEvent(this.labelElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe(data => this.save());

    fromEvent(this.descriptionElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe(data => this.save());
  }

  ngOnChanges() {
    if (!isEmpty(this.task)) {
      this.formGroup.setValue({
        id: this.task.id,
        label: this.task.label,
        description: this.task.description
      });
    }
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const data = clone(this.formGroup.value);
    this.apollo.mutate({
      mutation: UpdateTaskMutation,
      variables: data,
      refetchQueries: [{
        query: GetTasks,
        variables: {
          buildId: this.task.buildId,
          parentId: null
        }
      }]
    }).subscribe();
  }

  addTask() {
    this.apollo.mutate({
      mutation: CreateTaskMutation,
      variables: {
        buildId: this.task.buildId,
        parentId: this.task.id
      },
      refetchQueries: [{
        query: GetTasks,
        variables: {
          buildId: this.task.buildId,
          parentId: this.task.id
        }
      }]
    }).subscribe();
  }
}
