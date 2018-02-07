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
   routing,
   WhitelistComponent,
   WhitelistIndexComponent,
   WhitelistInstructionsComponent
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
     WhitelistComponent,
     WhitelistIndexComponent,
     WhitelistInstructionsComponent
   ]
 })
 export class WhitelistModule {
 }
