/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
  AudioListComponent,
  AudioListDragndropDirective,
  CharacterCreateComponent,
  CharacterItemComponent,
  CharacterListComponent,
  CharacterListFiltersComponent,
  CharacterShowComponent,
  CharacterIndexComponent,
  FileListComponent,
  FileListDragndropDirective
} from './';
import { characterFiltersReducer, characterSuggestReducer } from '../../store';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DragDropModule,
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
    CharacterIndexComponent,
    FileListComponent,
    FileListDragndropDirective
  ],
  providers: [
  ]
})
export class CharacterModule {
}
