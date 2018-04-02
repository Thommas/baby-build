/**
 * Path of child
 *
 * Component - Quest - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { GetQuests } from '../../../graphql';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-quest-index-cmp',
  templateUrl: './quest-index.component.html',
  styleUrls: ['./quest-index.component.scss']
})
export class QuestIndexComponent {
  loading: boolean;
  quests: any;
  year: number;

  constructor(
    private apollo: Apollo,
    private buildService: BuildService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.year = 1;
    this.getQuests();
  }

  getQuests() {
    this.apollo.watchQuery<any>({
      query: GetQuests,
      variables: {
        build_id: this.buildService.build.id,
        year: this.year
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.quests = data.quests;
      });
  }
}
