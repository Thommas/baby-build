/**
 * Path of child
 *
 * Component - Calendar - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-index-cmp',
  templateUrl: './calendar-index.component.html',
  styleUrls: ['./calendar-index.component.scss']
})
export class CalendarIndexComponent {
  eras: any = [
    {
      label: 'calendar.list.baby',
      childYears: [1, 2, 3, 4, 5]
    },
    {
      label: 'calendar.list.young_child',
      childYears: [6, 7, 8, 9, 10]
    },
    {
      label: 'calendar.list.child',
      childYears: [11, 12, 13, 14, 15]
    },
    {
      label: 'calendar.list.teenager',
      childYears: [16, 17, 18, 19, 20]
    },
    {
      label: 'calendar.list.young_adult',
      childYears: [21, 22, 23, 24, 25]
    }
  ];
}
