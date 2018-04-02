/**
 * Path of child
 *
 * Component - Calendar - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-calendar-list-cmp',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {
  @Input() years: Array<number>;
  loading: boolean;

  constructor(
    private apollo: Apollo,
    private buildService: BuildService
  ) {}

  ngOnInit() {
    // FIXME
  }
}
