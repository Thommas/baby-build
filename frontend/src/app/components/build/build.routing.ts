/**
 * Path of child
 *
 * Component - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { BuildCreateComponent } from './build-create/build-create.component';
import { BuildIndexComponent } from './build-index/build-index.component';
import { BuildShowComponent } from './build-show/build-show.component';
import { QuestCreateComponent } from './quest-create/quest-create.component';

const routes: Routes = [
  {
    path: 'build/create',
    component: BuildCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'build',
    component: BuildIndexComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'build/:id/quest/create',
    component: QuestCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'build/:id',
    component: BuildShowComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
