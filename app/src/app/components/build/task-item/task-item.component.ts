/**
 * Path of child
 *
 * Component - Task - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone, isEmpty } from 'lodash';
import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  CreateTaskMutation,
  UpdateTaskMutation,
  DeleteTaskMutation,
  GetTasks
} from '../../../graphql';

@Component({
  selector: 'app-task-item-cmp',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnChanges {
  @Input() task: any;
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;
  emptyTaskReadyForDeletion: boolean;

  constructor(private apollo: Apollo) {
    this.emptyTaskReadyForDeletion = false;
    this.task = {};
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      label: new FormControl('', [Validators.required])
    });
    this.formGroup.setValue({
      id: null,
      label: ''
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
        label: this.task.label
      });
      if (!this.task.label || this.task.label.length === 0) {
        this.emptyTaskReadyForDeletion = true;
      }
    }

  }

  save(label: string) {
    if (!this.formGroup.valid) {
      return;
    }
    this.apollo.mutate({
      mutation: this.task.id ? UpdateTaskMutation : CreateTaskMutation,
      variables: {
        id: this.task.id ? this.task.id : undefined,
        label: label
      }
    }).subscribe();
  }

  onKey(event: KeyboardEvent) {
    if (!this.formGroup.get('label').value || this.formGroup.get('label').value.length === 0) {
      if (this.emptyTaskReadyForDeletion) {
        this.delete();
      } else {
        this.emptyTaskReadyForDeletion = true;
      }
    } else {
      this.emptyTaskReadyForDeletion = false;
    }
  }

  delete() {
    this.apollo.mutate({
      mutation: DeleteTaskMutation,
      variables: {
        id: this.task.id
      },
      refetchQueries: [{
        query: GetTasks,
        variables: {
          buildId: this.task.buildId,
          parentId: this.task.parentId
        }
      }]
    }).subscribe();
  }
}
