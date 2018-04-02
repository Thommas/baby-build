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

const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarIndexComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
