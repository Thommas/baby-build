/**
 * Path of child
 *
 * Component - Main - Module
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import {
  routing,
  IdeaIconComponent,
  IdeaItemComponent,
  IdeaListComponent,
  IdeaListFiltersComponent,
  IdeaShowComponent,
  IdeaTagItemComponent,
  IdeaTagListComponent,
  MainIndexComponent,
  ReviewItemComponent,
  ReviewListComponent,
  ReviewShowComponent
} from './';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    routing,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: [
    IdeaIconComponent,
    IdeaItemComponent,
    IdeaListComponent,
    IdeaListFiltersComponent,
    IdeaShowComponent,
    IdeaTagItemComponent,
    IdeaTagListComponent,
    MainIndexComponent,
    ReviewItemComponent,
    ReviewListComponent,
    ReviewShowComponent
  ],
  providers: [
  ]
})
export class MainModule {
}
