/**
 * Path of child
 *
 * Component - Static
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { BrandingComponent } from './branding/branding.component';
import { KitchenComponent } from './kitchen/kitchen.component';

const routes: Routes = [
  {
    path: 'branding',
    component: BrandingComponent
  },
  {
    path: 'kitchen',
    component: KitchenComponent
  }
];

export const routing = RouterModule.forChild(routes);
