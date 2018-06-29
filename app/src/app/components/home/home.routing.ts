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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
