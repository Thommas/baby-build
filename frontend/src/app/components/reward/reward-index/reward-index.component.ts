/**
 * Path of child
 *
 * Component - Reward - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetRewards } from '../../../graphql';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-reward-index-cmp',
  templateUrl: './reward-index.component.html',
  styleUrls: ['./reward-index.component.scss']
})
export class RewardIndexComponent {
  loading: boolean;
  rewards: any;

  constructor(
    private apollo: Apollo,
    private buildService: BuildService
  ) {}

  ngOnInit() {
    if (this.buildService.build && this.buildService.childYear) {
      this.getRewards();
    }
  }

  getRewards() {
    this.apollo.watchQuery<any>({
      query: GetRewards,
      variables: {
        build_id: this.buildService.build.id,
        child_year: this.buildService.childYear
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.rewards = data.rewards;
      });
  }
}
