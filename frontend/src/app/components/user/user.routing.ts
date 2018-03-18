/**
 * Path of child
 *
 * Component - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: 'user/edit',
    component: UserEditComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
