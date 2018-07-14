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
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;

  constructor(private apollo: Apollo, private buildService: BuildService) {
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
}
