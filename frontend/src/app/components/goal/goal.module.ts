/**
 * Path of child
 *
 * Component - Goal - Module
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
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatTabsModule
} from '@angular/material';

import {
  routing,
  GoalFormComponent,
  GoalIndexComponent
} from './';

@NgModule({
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTabsModule
  ],
  exports: [
    GoalFormComponent,
    GoalIndexComponent
  ],
  declarations: [
    GoalFormComponent,
    GoalIndexComponent
  ]
})
export class GoalModule {
}
