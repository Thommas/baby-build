/**
 * Path of child
 *
 * Component - Home
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { WhitelistIndexComponent } from './whitelist-index/whitelist-index.component';

const routes: Routes = [
  {
    path: 'whitelist',
    component: WhitelistIndexComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
