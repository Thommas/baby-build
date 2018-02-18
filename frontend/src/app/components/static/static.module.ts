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
 import {
   MatButtonModule,
   MatCardModule,
   MatIconModule,
   MatFormFieldModule,
   MatInputModule,
   MatMenuModule,
   MatProgressBarModule,
   MatSidenavModule,
   MatTabsModule,
   MatToolbarModule,
   MatTooltipModule
 } from '@angular/material';

 import {
   routing,
   BrandingComponent,
   KitchenComponent
 } from './';

 @NgModule({
   imports: [
     BrowserModule,
     FlexLayoutModule,
     routing,
     MatButtonModule,
     MatCardModule,
     MatIconModule,
     MatFormFieldModule,
     MatInputModule,
     MatMenuModule,
     MatProgressBarModule,
     MatSidenavModule,
     MatTabsModule,
     MatToolbarModule,
     MatTooltipModule
   ],
   declarations: [
     BrandingComponent,
     KitchenComponent
   ]
 })
 export class StaticModule {
 }
