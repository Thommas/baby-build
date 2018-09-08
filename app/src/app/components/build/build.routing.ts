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
import { BuildShowComponent } from './build-show/build-show.component';

const routes: Routes = [
  {
    path: 'build',
    children: [
      {
        path: 'create',
        component: BuildFormComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'update/:id',
        component: BuildFormComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: ':id',
        component: BuildShowComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
