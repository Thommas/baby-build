/**
 * Path of child
 *
 * Component - Security
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthService } from '../../services';

import {
  routing,
  CallbackComponent,
  LoginComponent
} from './';

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    routing
  ],
  declarations: [
    CallbackComponent,
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class SecurityModule {
}
