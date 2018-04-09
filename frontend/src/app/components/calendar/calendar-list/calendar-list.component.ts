/**
 * Path of child
 *
 * Component - Calendar - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-calendar-list-cmp',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent {
  @Input() era: Array<any>;
  loading: boolean;

  constructor(
    private apollo: Apollo,
    private buildService: BuildService,
    private router: Router
  ) {}

  selectYear(childYear: number) {
    this.buildService.setChildYear(childYear);
    this.router.navigate([`/calendar/era/${this.era.id}/goal`]);
  }
}
