/**
 * Path of child
 *
 * Component - Task - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone, isEmpty } from 'lodash';
import { Component, Inject, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
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
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;

  constructor(private apollo: Apollo) {
    this.task = {};
    this.formGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      description: new FormControl('', [])
    });
    this.formGroup.setValue({
      id: null,
      description: ''
    });
  }

  ngOnInit() {
    fromEvent(this.inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe(data => this.save(data));
  }

  ngOnChanges() {
    if (!isEmpty(this.task)) {
      this.formGroup.setValue({
        id: this.task.id,
        description: this.task.description
      });
    }
  }

  save(description: string) {
    if (!this.formGroup.valid) {
      return;
    }
    this.apollo.mutate({
      mutation: UpdateTaskMutation,
      variables: {
        id: this.task.id,
        description: description
      },
      refetchQueries: [{
        query: GetTasks,
        variables: {
          buildId: this.task.buildId
        }
      }]
    }).subscribe();
  }
}
