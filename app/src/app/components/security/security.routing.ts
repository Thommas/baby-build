/**
 * Path of child
 *
 * Component - Security
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  {
    path: 'security/callback',
    component: CallbackComponent
  }
];

export const routing = RouterModule.forChild(routes);
