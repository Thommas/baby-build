/**
 * Path of child
 *
 * Component - Calendar - Module
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTabsModule
} from '@angular/material';

import {
  routing,
  CalendarHeaderComponent,
  CalendarIndexComponent,
  CalendarListComponent,
  CalendarShowComponent
} from './';
import { GoalModule } from '../goal/goal.module';
import { QuestModule } from '../quest/quest.module';
import { WhitelistModule } from '../whitelist/whitelist.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    routing,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule,
    MatTabsModule,
    GoalModule,
    QuestModule,
    WhitelistModule
  ],
  exports: [
    CalendarHeaderComponent
  ],
  declarations: [
    CalendarHeaderComponent,
    CalendarIndexComponent,
    CalendarListComponent,
    CalendarShowComponent
  ]
})
export class CalendarModule {
}
