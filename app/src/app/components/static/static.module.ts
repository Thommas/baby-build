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

import { AuthService } from '../../services';

import {
  routing,
  PageNotFoundComponent
} from './';

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    routing
  ],
  declarations: [
    PageNotFoundComponent
  ],
  providers: [
    AuthService
  ]
})
export class StaticModule {
}
