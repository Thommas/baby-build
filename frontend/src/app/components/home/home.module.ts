/**
 * Path of child
 *
 * Component - Home
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
   homeRouting,
   HomeComponent,
   HomeAnonymousComponent,
   HomeParentChildIndexComponent,
   HomeParentComponent
 } from './';

 @NgModule({
   imports: [
     BrowserModule,
     FlexLayoutModule,
     homeRouting,
     MatButtonModule,
     MatCardModule,
     MatIconModule,
     MatProgressBarModule,
     MatSidenavModule,
     MatToolbarModule,
     MatTooltipModule
   ],
   declarations: [
     HomeComponent,
     HomeAnonymousComponent,
     HomeParentChildIndexComponent,
     HomeParentComponent
   ]
 })
 export class HomeModule {
 }
