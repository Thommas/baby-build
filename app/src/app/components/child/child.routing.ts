/**
 * Path of child
 *
 * Component - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { ChildDeleteComponent } from './child-delete/child-delete.component';
import { ChildFormComponent } from './child-form/child-form.component';
import { ChildIndexComponent } from './child-index/child-index.component';

const routes: Routes = [
  {
    path: 'child',
    component: ChildIndexComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'child/create',
    component: ChildFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'child/update/:id',
    component: ChildFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'child/delete/:id',
    component: ChildDeleteComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
