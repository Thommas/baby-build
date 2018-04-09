/**
 * Path of child
 *
 * Component - Calendar - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-calendar-show-cmp',
  templateUrl: './calendar-show.component.html',
  styleUrls: ['./calendar-show.component.scss']
})
export class CalendarShowComponent implements OnInit {
  selectedTab: string;
  selectedEra: string;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private buildService: BuildService,
    private router: Router
  ) {
    this.selectedTab = null;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedTab = params.tab;
      this.selectedEra = params.era;
    });
  }

  selectTab(newTab) {
    this.router.navigate([`/calendar/era/${this.selectedEra}/${newTab}`]);
  }
}
