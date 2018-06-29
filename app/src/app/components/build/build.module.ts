/**
 * Path of child
 *
 * Component - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { BuildService } from '../../services';

import {
  routing,
  BuildFormComponent,
  BuildIndexComponent,
  BuildShowComponent
} from './';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    routing,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: [
    BuildFormComponent,
    BuildIndexComponent,
    BuildShowComponent
  ],
  providers: [
    BuildService
  ]
})
export class BuildModule {
}
