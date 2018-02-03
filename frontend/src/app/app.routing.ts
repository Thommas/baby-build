/**
 * Path of child
 *
 * App
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services';
import { PageNotFoundComponent } from './components/shared';

const appRoutes: Routes = [
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthGuardService]
  }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
