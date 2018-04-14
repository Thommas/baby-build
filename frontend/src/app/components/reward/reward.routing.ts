/**
 * Path of child
 *
 * Component - Reward - Routing
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { RewardFormComponent } from './reward-form/reward-form.component';

const routes: Routes = [
  {
    path: 'reward/update/:id',
    component: RewardFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'reward/create',
    component: RewardFormComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
