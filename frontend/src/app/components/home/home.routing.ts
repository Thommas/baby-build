/**
 * Path of child
 *
 * Component - Home
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { HomeComponent } from './home/home.component';
import { HomeParentChildCreateComponent } from './home-parent-child-create/home-parent-child-create.component';

const routes: Routes = [
  {
    path: 'child/create',
    component: HomeParentChildCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
