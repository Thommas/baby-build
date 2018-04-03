/**
 * Path of child
 *
 * Component - Goal - Routing
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { GoalFormComponent } from './goal-form/goal-form.component';

const routes: Routes = [
  {
    path: 'goal/update/:id',
    component: GoalFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'goal/create',
    component: GoalFormComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
