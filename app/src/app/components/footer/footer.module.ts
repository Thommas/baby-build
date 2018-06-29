/**
 * Path of child
 *
 * Component - Footer
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService, BrowserService } from '../../services';
import { FooterComponent } from './';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    FooterComponent
  ],
  declarations: [
    FooterComponent
  ],
  providers: [
    AuthService,
    BrowserService
  ]
})
export class FooterModule {
}
