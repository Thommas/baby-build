/**
 * Path of child
 *
 * Component - LifeTutorial
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
   LifeTutorialComponent,
   LifeTutorialIndexComponent,
   LifeTutorialInstructionsComponent,
   LifeTutorialShowComponent
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
     LifeTutorialComponent,
     LifeTutorialIndexComponent,
     LifeTutorialInstructionsComponent,
     LifeTutorialShowComponent
   ]
 })
 export class LifeTutorialModule {
 }
