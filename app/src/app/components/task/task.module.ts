/**
 * Path of child
 *
 * Component - Task - Module
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
  TaskFormComponent,
  TaskIndexComponent,
  TaskShowComponent,
  routing
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
    MatSelectModule,
    routing
  ],
  exports: [
    TaskIndexComponent,
    TaskShowComponent
  ],
  declarations: [
    TaskFormComponent,
    TaskIndexComponent,
    TaskShowComponent
  ]
})
export class TaskModule {
}
