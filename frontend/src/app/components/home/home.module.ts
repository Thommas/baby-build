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
   homeRouting,
   HomeComponent,
   HomeParentComponent
 } from './';

 @NgModule({
   imports: [
     BrowserModule,
     FlexLayoutModule,
     homeRouting
   ],
   declarations: [
     HomeComponent,
     HomeParentComponent
   ]
 })
 export class HomeModule {
 }
