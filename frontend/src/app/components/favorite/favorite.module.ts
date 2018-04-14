/**
 * Path of child
 *
 * Component - Favorite - Module
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
  FavoriteEditComponent,
  FavoriteFormComponent,
  FavoriteIndexComponent
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
    FavoriteEditComponent,
    FavoriteFormComponent,
    FavoriteIndexComponent
  ],
  declarations: [
    FavoriteEditComponent,
    FavoriteFormComponent,
    FavoriteIndexComponent
  ],
  entryComponents: [
    FavoriteEditComponent
  ]
})
export class FavoriteModule {
}
