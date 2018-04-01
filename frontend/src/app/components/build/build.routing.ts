/**
 * Path of child
 *
 * Component - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { BuildFormComponent } from './build-form/build-form.component';
import { BuildIndexComponent } from './build-index/build-index.component';
import { BuildShowComponent } from './build-show/build-show.component';

const routes: Routes = [
  {
    path: 'build/create',
    component: BuildFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'build/update/:id',
    component: BuildFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'build/:id',
    component: BuildShowComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'build',
    component: BuildIndexComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
