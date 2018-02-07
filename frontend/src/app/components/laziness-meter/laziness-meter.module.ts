/**
 * Path of child
 *
 * Component - LazinessMeter
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
   MatProgressBarModule,
   MatSidenavModule,
   MatToolbarModule,
   MatTooltipModule
 } from '@angular/material';

 import {
   routing,
   LazinessMeterComponent,
   LazinessMeterIndexComponent,
   LazinessMeterInstructionsComponent
 } from './';

 @NgModule({
   imports: [
     BrowserModule,
     FlexLayoutModule,
     routing,
     MatButtonModule,
     MatCardModule,
     MatIconModule,
     MatProgressBarModule,
     MatSidenavModule,
     MatToolbarModule,
     MatTooltipModule
   ],
   declarations: [
     LazinessMeterComponent,
     LazinessMeterIndexComponent,
     LazinessMeterInstructionsComponent
   ]
 })
 export class LazinessMeterModule {
 }
