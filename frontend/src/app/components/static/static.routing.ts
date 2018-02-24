/**
 * Path of child
 *
 * Component - Static
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';

import { BrandingComponent } from './branding/branding.component';
import { ContactComponent } from './contact/contact.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
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
  }
];

export const routing = RouterModule.forChild(routes);
