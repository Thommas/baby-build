/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { Actions, EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../environments/environment';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { CharacterModule } from './components/character/character.module';
import { IdeaModule } from './components/idea/idea.module';
import { WorldModule } from './components/world/world.module';
import { WorldViewModule } from './components/world-view/world-view.module';
import { UserModule } from './components/user/user.module';
import { SecurityModule } from './components/security/security.module';
import { StaticModule } from './components/static/static.module';
import {
  SidebarComponent,
  TopbarComponent
} from './components/layout';
import {
  AngularticsService,
  ApolloService,
  AuthGuardService,
  AuthService,
  BrowserService,
  ConstantsService,
  FormService,
  ProgressService,
} from './services';
import {
  AuthFacade,
  CharacterFacade,
  CharacterFiltersFacade,
  CharacterSuggestFacade,
  FileFacade,
  IdeaFacade,
  IdeaFiltersFacade,
  IdeaSuggestFacade,
  ReviewFacade,
  SharingFacade,
  UserFacade,
  WorldFacade,
  WorldFiltersFacade,
} from './facade';
import {
  authReducer,
  characterReducer,
  characterFiltersReducer,
  characterSuggestReducer,
  fileReducer,
  ideaReducer,
  ideaFiltersReducer,
  ideaSuggestReducer,
  reviewReducer,
  worldReducer,
  worldFiltersReducer,
} from './store';
import { AppDragndropDirective } from './app.dragndrop.directive';
import { InMemoryCache } from 'apollo-cache-inmemory';

// ngrx-store-localstorage
const reducers: ActionReducerMap<any> = {
  auth: authReducer,
  character: characterReducer,
  characterFilters: characterFiltersReducer,
  characterSuggest: characterSuggestReducer,
  file: fileReducer,
  idea: ideaReducer,
  ideaFilters: ideaFiltersReducer,
  ideaSuggest: ideaSuggestReducer,
  review: reviewReducer,
  world: worldReducer,
  worldFilters: worldFiltersReducer,
};
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['auth'], rehydrate: true})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    AppDragndropDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'path-of-child' }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpLinkModule,
    RouterModule,
    routing,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    CharacterModule,
    IdeaModule,
    WorldModule,
    WorldViewModule,
    UserModule,
    SecurityModule,
    StaticModule,
    StoreModule.forRoot(
      reducers,
      {metaReducers}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      CharacterFacade,
      CharacterSuggestFacade,
      FileFacade,
      IdeaFacade,
      IdeaSuggestFacade,
      ReviewFacade,
      SharingFacade,
      UserFacade,
      WorldFacade,
    ])
  ],
  providers: [
    appRoutingProviders,
    AngularticsService,
    ApolloService,
    AuthGuardService,
    AuthService,
    BrowserService,
    ConstantsService,
    FormService,
    ProgressService,
    Actions,
    AuthFacade,
    CharacterFacade,
    CharacterFiltersFacade,
    CharacterSuggestFacade,
    FileFacade,
    IdeaFacade,
    IdeaFiltersFacade,
    ReviewFacade,
    SharingFacade,
    UserFacade,
    WorldFacade,
    WorldFiltersFacade,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(apolloService: ApolloService) {}
}
