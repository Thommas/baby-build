/**
 * Path of child
 *
 * Component - Calendar - Routing
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { CalendarIndexComponent } from './calendar-index/calendar-index.component';
import { CalendarShowComponent } from './calendar-show/calendar-show.component';

const routes: Routes = [
  {
    path: 'calendar/era/:era/:tab',
    component: CalendarShowComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'calendar/era/:tab',
    component: CalendarIndexComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
