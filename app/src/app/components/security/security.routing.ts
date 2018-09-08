/**
 * Path of child
 *
 * Component - Security
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'security/callback',
    component: CallbackComponent
  },
  {
    path: 'security/login',
    component: LoginComponent
  }
];

export const routing = RouterModule.forChild(routes);
