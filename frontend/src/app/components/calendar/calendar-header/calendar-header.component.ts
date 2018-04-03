/**
 * Path of child
 *
 * Component - Calendar - Header
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-calendar-header-cmp',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {
  @Input('goBackRoute') goBackRoute: string;

  constructor(public buildService: BuildService) {}
}
