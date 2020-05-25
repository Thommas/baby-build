/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { WorldViewIndexComponent } from './world-view-index/world-view-index.component';

const routes: Routes = [
  {
    path: 'world-view',
    component: WorldViewIndexComponent,
    canActivate: [AuthGuardService]
  },
];

export const routing = RouterModule.forChild(routes);
