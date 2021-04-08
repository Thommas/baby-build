/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { StoreModule } from '@ngrx/store';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  routing,
  IdeaCreateComponent,
  IdeaIconComponent,
  IdeaItemComponent,
  IdeaListComponent,
  IdeaListFiltersComponent,
  IdeaShowComponent,
  IdeaIndexComponent,
  ReviewItemComponent,
  ReviewListComponent,
  ReviewShowComponent
} from './';
import { ideaFiltersReducer, ideaSuggestReducer } from '../../store';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ScrollingModule,
    routing,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    StoreModule.forRoot({
      ideaFilters: ideaFiltersReducer,
      ideaSuggest: ideaSuggestReducer,
    })
  ],
  declarations: [
    IdeaCreateComponent,
    IdeaIconComponent,
    IdeaItemComponent,
    IdeaListComponent,
    IdeaListFiltersComponent,
    IdeaShowComponent,
    IdeaIndexComponent,
    ReviewItemComponent,
    ReviewListComponent,
    ReviewShowComponent
  ],
  providers: [
  ]
})
export class IdeaModule {
}
