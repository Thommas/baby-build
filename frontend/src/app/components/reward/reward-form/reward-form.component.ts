/**
 * Path of child
 *
 * Component - Reward - Form
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
  CreateRewardMutation,
  UpdateRewardMutation,
  GetReward,
  GetRewards
} from '../../../graphql';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-reward-form-cmp',
  templateUrl: './reward-form.component.html',
  styleUrls: ['./reward-form.component.scss']
})
export class RewardFormComponent implements OnInit {
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
        query: GetReward,
        variables: {
          id: params.id
        }
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;
          this.formGroup.setValue({
            id: data.reward.id,
            title: data.reward.title,
            description: data.reward.description
          });
        });
    });
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    const reward = clone(this.formGroup.value);
    reward.build_id = this.buildService.build.id;
    reward.child_year = this.buildService.childYear;
    this.apollo.mutate({
      mutation: reward.id ? UpdateRewardMutation : CreateRewardMutation,
      variables: {
        ...reward
      },
      refetchQueries: [
        {
          query: GetAuthUser,
        },
        {
          query: GetRewards,
          variables: {
            build_id: this.buildService.build.id,
            child_year: this.buildService.childYear
          },
        }
      ],
    }).subscribe(
      res => this.router.navigate([`/calendar/era/${this.buildService.era}/reward`])
    );
  }
}
