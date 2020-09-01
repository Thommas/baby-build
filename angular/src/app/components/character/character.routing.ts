/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { CharacterIndexComponent } from './character-index/character-index.component';

const routes: Routes = [
  {
    path: 'character/create',
    component: CharacterCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'character',
    component: CharacterIndexComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing = RouterModule.forChild(routes);
