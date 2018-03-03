/**
 * Path of child
 *
 * Component - Parent
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { ParentEditComponent } from './parent-edit/parent-edit.component';

const routes: Routes = [
  {
    path: 'parent/edit',
    component: ParentEditComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
