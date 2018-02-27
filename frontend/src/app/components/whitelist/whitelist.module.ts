/**
 * Path of child
 *
 * Component - Home
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
  MatTabsModule
} from '@angular/material';

import {
  routing,
  WhitelistEditComponent,
  WhitelistFormComponent,
  WhitelistIndexComponent,
  WhitelistListComponent
} from './';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    routing,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule
  ],
  declarations: [
    WhitelistEditComponent,
    WhitelistFormComponent,
    WhitelistIndexComponent,
    WhitelistListComponent
  ],
  entryComponents: [
    WhitelistEditComponent
  ]
})
export class WhitelistModule {
}
