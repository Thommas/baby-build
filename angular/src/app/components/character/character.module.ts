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
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatMenuModule,
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
  AudioListComponent,
  AudioListDragndropDirective,
  CharacterCreateComponent,
  CharacterItemComponent,
  CharacterListComponent,
  CharacterListFiltersComponent,
  CharacterShowComponent,
  CharacterIndexComponent
} from './';
import { characterFiltersReducer, characterSuggestReducer } from '../../store';

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
      characterFilters: characterFiltersReducer,
      characterSuggest: characterSuggestReducer,
    })
  ],
  declarations: [
    AudioListComponent,
    AudioListDragndropDirective,
    CharacterCreateComponent,
    CharacterItemComponent,
    CharacterListComponent,
    CharacterListFiltersComponent,
    CharacterShowComponent,
    CharacterIndexComponent
  ],
  providers: [
  ]
})
export class CharacterModule {
}
