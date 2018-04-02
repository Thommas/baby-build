/**
 * Path of child
 *
 * Component - Goal - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone, isEmpty } from 'lodash';
import { Component, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  GetAuthUser,
  CreateGoalMutation,
  UpdateGoalMutation,
  GetGoals
} from '../../../graphql';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-goal-form-cmp',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss']
})
export class GoalFormComponent implements OnChanges {
  @Output('success') success: EventEmitter<any> = new EventEmitter<any>();
  @Input() goal: any;
  @Input() year: number;
  formGroup: FormGroup;
  loading: boolean;

  constructor(private apollo: Apollo, private buildService: BuildService) {
    this.goal = {};
    this.year = null;
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      title: new FormControl('', [Validators.required]),
      required_age: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(25)
      ])
    });
    this.formGroup.setValue({
      id: null,
      title: '',
      required_age: 12
    });
  }

  ngOnChanges() {
    if (!isEmpty(this.goal)) {
      this.formGroup.setValue({
        id: this.goal.id,
        title: this.goal.title,
        required_age: this.goal.required_age
      });
    }
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    const goal = clone(this.formGroup.value);
    goal.build_id = this.buildService.build.id;
    goal.year = this.year;
    this.apollo.mutate({
      mutation: goal.id ? UpdateGoalMutation : CreateGoalMutation,
      variables: {
        ...goal
      },
      refetchQueries: [
        {
          query: GetAuthUser,
        },
        {
          query: GetGoals,
          variables: {
            build_id: this.buildService.build.id,
            year: this.year
          },
        }
      ],
    }).subscribe(
      res => this.success.emit({})
    );
  }
}
