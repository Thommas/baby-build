/**
 * Path of child
 *
 * App - Routing
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import {
  BrandingComponent,
  ContactComponent,
  KitchenComponent,
  TermsComponent,
  PageNotFoundComponent
} from './components';

const appRoutes: Routes = [
  {
    path: 'branding',
    component: BrandingComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'kitchen',
    component: KitchenComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
