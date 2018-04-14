/**
 * Path of child
 *
 * Component - Reward - Module
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
  RewardFormComponent,
  RewardIndexComponent
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
    RewardFormComponent,
    RewardIndexComponent
  ],
  declarations: [
    RewardFormComponent,
    RewardIndexComponent
  ]
})
export class RewardModule {
}
