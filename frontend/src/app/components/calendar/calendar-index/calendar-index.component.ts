/**
 * Path of child
 *
 * Component - Calendar - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { find } from 'lodash'
import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-calendar-index-cmp',
  templateUrl: './calendar-index.component.html',
  styleUrls: ['./calendar-index.component.scss']
})
export class CalendarIndexComponent implements OnInit {
  @ViewChild('tab') tab: any;

  constructor(
    private route: ActivatedRoute,
    public buildService: BuildService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const era = find(this.buildService.eras, ['id', params.tab]);
      if (era) {
        this.tab.selectedIndex = era.index;
      }
    });
  }

  selectedTabChange(event) {
    const era = find(this.buildService.eras, ['index', event.index]);
    if (era) {
      this.router.navigate(['/calendar/era/' + era.id]);
    }
  }
}
