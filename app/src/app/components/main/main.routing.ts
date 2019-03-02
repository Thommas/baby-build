/**
 * Path of child
 *
 * Component - Main - Routing
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { MainIndexComponent } from './main-index/main-index.component';

const routes: Routes = [
  {
    path: '',
    component: MainIndexComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
