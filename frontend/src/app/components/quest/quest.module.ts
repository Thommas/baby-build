/**
 * Path of child
 *
 * Component - Quest - Module
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
  QuestFormComponent,
  QuestIndexComponent
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
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  exports: [
    QuestFormComponent,
    QuestIndexComponent
  ],
  declarations: [
    QuestFormComponent,
    QuestIndexComponent
  ],
  providers: [
    BuildService
  ]
})
export class QuestModule {
}
