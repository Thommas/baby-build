/**
 * Path of child
 *
 * Component - Goal - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetGoals } from '../../../graphql';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-goal-index-cmp',
  templateUrl: './goal-index.component.html',
  styleUrls: ['./goal-index.component.scss']
})
export class GoalIndexComponent {
  loading: boolean;
  goals: any;

  constructor(
    private apollo: Apollo,
    private buildService: BuildService
  ) {}

  ngOnInit() {
    if (this.buildService.build && this.buildService.childYear) {
      this.getGoals();
    }
  }

  getGoals() {
    this.apollo.watchQuery<any>({
      query: GetGoals,
      variables: {
        build_id: this.buildService.build.id,
        child_year: this.buildService.childYear
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.goals = data.goals;
      });
  }
}
