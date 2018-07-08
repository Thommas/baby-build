/**
 * Path of child
 *
 * Component - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { TaskIndexComponent } from './task-index/task-index.component';

const routes: Routes = [
  {
    path: ':build_id/task',
    component: TaskIndexComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
