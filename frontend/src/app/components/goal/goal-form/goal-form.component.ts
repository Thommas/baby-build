/**
 * Path of child
 *
 * Component - Goal - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  GetAuthUser,
  CreateGoalMutation,
  UpdateGoalMutation,
  GetGoal,
  GetGoals
} from '../../../graphql';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-goal-form-cmp',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss']
})
export class GoalFormComponent implements OnInit {
  formGroup: FormGroup;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    public buildService: BuildService,
    private router: Router
  ) {
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

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.loading = false;
        return;
      }

      this.apollo.watchQuery<any>({
        query: GetGoal,
        variables: {
          id: params.id
        }
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;
          this.formGroup.setValue({
            id: data.goal.id,
            title: data.goal.title,
            description: data.goal.description
          });
        });
    });
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
      res => this.router.navigate(['/calendar/year/goal'])
    );
  }
}
