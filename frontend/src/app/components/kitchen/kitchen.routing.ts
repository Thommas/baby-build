/**
 * Path of child
 *
 * Component - Home
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { KitchenComponent } from './kitchen/kitchen.component';

const routes: Routes = [
  {
    path: 'kitchen',
    component: KitchenComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
