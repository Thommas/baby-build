/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { IdeaCreateComponent } from './idea-create/idea-create.component';
import { IdeaIndexComponent } from './idea-index/idea-index.component';

const routes: Routes = [
  {
    path: 'create',
    component: IdeaCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: IdeaIndexComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
