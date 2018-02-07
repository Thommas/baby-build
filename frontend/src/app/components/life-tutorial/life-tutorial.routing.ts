/**
 * Path of child
 *
 * Component - LifeTutorial
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { LifeTutorialComponent } from './life-tutorial/life-tutorial.component';

const routes: Routes = [
  {
    path: 'life-tutorial',
    component: LifeTutorialComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
