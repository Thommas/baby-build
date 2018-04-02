/**
 * Path of child
 *
 * Component - Goal - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
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
  year: number;

  constructor(
    private apollo: Apollo,
    private buildService: BuildService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.year = 1;
    this.getGoals();
  }

  getGoals() {
    this.apollo.watchQuery<any>({
      query: GetGoals,
      variables: {
        build_id: this.buildService.build.id,
        year: this.year
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.goals = data.goals;
      });
  }
}
