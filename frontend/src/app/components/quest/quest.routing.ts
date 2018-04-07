/**
 * Path of child
 *
 * Component - Quest - Routing
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { QuestFormComponent } from './quest-form/quest-form.component';

const routes: Routes = [
  {
    path: 'quest/update/:id',
    component: QuestFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'quest/create',
    component: QuestFormComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
