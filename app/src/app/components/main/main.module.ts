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
import { StoreModule } from '@ngrx/store';
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

import { ideaFiltersReducer } from '../../store';

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
    MatTooltipModule,
    StoreModule.forRoot({ ideaFilters: ideaFiltersReducer })
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
