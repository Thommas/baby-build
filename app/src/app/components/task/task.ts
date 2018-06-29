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
  TaskEditComponent,
  TaskFormComponent,
  TaskIndexComponent
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
    TaskEditComponent,
    TaskFormComponent,
    TaskIndexComponent
  ],
  declarations: [
    TaskEditComponent,
    TaskFormComponent,
    TaskIndexComponent
  ],
  entryComponents: [
    TaskEditComponent
  ]
})
export class TaskModule {
}
