/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { WorldShowComponent } from './world-show/world-show.component';
import { WorldIndexComponent } from './world-index/world-index.component';

const routes: Routes = [
  {
    path: 'world/:id',
    component: WorldShowComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'world',
    component: WorldIndexComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
