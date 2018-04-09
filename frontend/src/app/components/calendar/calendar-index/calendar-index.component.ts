/**
 * Path of child
 *
 * Component - Calendar - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calendar-index-cmp',
  templateUrl: './calendar-index.component.html',
  styleUrls: ['./calendar-index.component.scss']
})
export class CalendarIndexComponent implements OnInit {
  @ViewChild('tab') tab: any;
  eras: any = [
    {
      index: 0,
      id: 'baby',
      label: 'calendar.list.baby',
      childYears: [1, 2, 3, 4, 5]
    },
    {
      index: 1,
      id: 'young-child',
      label: 'calendar.list.young_child',
      childYears: [6, 7, 8, 9, 10]
    },
    {
      index: 2,
      id: 'child',
      label: 'calendar.list.child',
      childYears: [11, 12, 13, 14, 15]
    },
    {
      index: 3,
      id: 'teenager',
      label: 'calendar.list.teenager',
      childYears: [16, 17, 18, 19, 20]
    },
    {
      index: 4,
      id: 'young-adult',
      label: 'calendar.list.young_adult',
      childYears: [21, 22, 23, 24, 25]
    }
  ];

  constructor(
    private route: ActivatedRoute
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const era = _.find(this.eras, ['id', params.tab]);
      if (era) {
        this.tab.selectedIndex = era.index;
      }
    });
  }

  selectedTabChange(event) {
    const era = _.find(this.eras, ['index', event.index]);
    if (era) {
      this.router.navigate(['/calendar/era/' + era.id]);
    }
  }
}
