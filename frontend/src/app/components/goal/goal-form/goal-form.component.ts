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
  formGroup: FormGroup;
  loading: boolean;

  constructor(private apollo: Apollo, public buildService: BuildService) {
    this.goal = {};
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
    this.formGroup.setValue({
      id: null,
      title: '',
      description: ''
    });
  }

  ngOnChanges() {
    if (!isEmpty(this.goal)) {
      this.formGroup.setValue({
        id: this.goal.id,
        title: this.goal.title,
        description: this.goal.description
      });
    }
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    const goal = clone(this.formGroup.value);
    goal.build_id = this.buildService.build.id;
    goal.child_year = this.buildService.childYear;
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
            child_year: this.buildService.childYear
          },
        }
      ],
    }).subscribe(
      res => this.success.emit({})
    );
  }
}
