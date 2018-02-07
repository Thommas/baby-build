/**
 * Path of child
 *
 * Component - LazinessMeter
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { LazinessMeterComponent } from './laziness-meter/laziness-meter.component';

const routes: Routes = [
  {
    path: 'laziness-meter',
    component: LazinessMeterComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
