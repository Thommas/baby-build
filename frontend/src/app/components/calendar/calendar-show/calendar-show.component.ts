/**
 * Path of child
 *
 * Component - Calendar - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-calendar-show-cmp',
  templateUrl: './calendar-show.component.html',
  styleUrls: ['./calendar-show.component.scss']
})
export class CalendarShowComponent {
  selectedTab: string;
  loading: boolean;

  constructor(
    private apollo: Apollo,
    private buildService: BuildService,
    private router: Router
  ) {
    this.selectedTab = 'goal';
  }

  selectTab(newTab) {
    this.selectedTab = newTab;
  }
}
