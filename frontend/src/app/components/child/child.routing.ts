/**
 * Path of child
 *
 * Component - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { ChildCreateComponent } from './child-create/child-create.component';
import { ChildDeleteComponent } from './child-delete/child-delete.component';
import { ChildIndexComponent } from './child-index/child-index.component';
import { ChildUpdateComponent } from './child-update/child-update.component';

const routes: Routes = [
  {
    path: 'child',
    component: ChildIndexComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'child/create',
    component: ChildCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'child/update/:id',
    component: ChildUpdateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'child/delete/:id',
    component: ChildDeleteComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
