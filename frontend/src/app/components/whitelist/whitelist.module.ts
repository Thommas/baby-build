/**
 * Path of child
 *
 * Component - Whitelist - Module
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

import {
  WhitelistEditComponent,
  WhitelistFormComponent,
  WhitelistIndexComponent
} from './';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    WhitelistEditComponent,
    WhitelistFormComponent,
    WhitelistIndexComponent
  ],
  declarations: [
    WhitelistEditComponent,
    WhitelistFormComponent,
    WhitelistIndexComponent
  ],
  entryComponents: [
    WhitelistEditComponent
  ]
})
export class WhitelistModule {
}
