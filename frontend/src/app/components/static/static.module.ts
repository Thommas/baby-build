/**
 * Path of child
 *
 * Component - Static
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import {
  routing,
  BrandingComponent,
  ContactComponent,
  ContactDialogComponent,
  KitchenComponent,
  TermsComponent
} from './';

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: [
    BrandingComponent,
    ContactComponent,
    ContactDialogComponent,
    KitchenComponent,
    TermsComponent
  ],
  entryComponents: [
    ContactDialogComponent
  ]
})
export class StaticModule {
}
