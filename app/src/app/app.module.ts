/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { Actions, EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
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
  MatTooltipModule
} from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { localStorageSync } from 'ngrx-store-localstorage';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
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
  LocaleService,
  ProgressService
} from './services';
import {
  AuthFacade,
  CharacterFacade,
  CharacterFiltersFacade,
  CharacterSuggestFacade,
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
  ideaReducer,
  ideaFiltersReducer,
  ideaSuggestReducer,
  reviewReducer,
  worldReducer,
  worldFiltersReducer,
} from './store';
import { AppDragndropDirective } from './app.dragndrop.directive';

// ngrx-store-localstorage
const reducers: ActionReducerMap<any> = {
  auth: authReducer,
  character: characterReducer,
  characterFilters: characterFiltersReducer,
  characterSuggest: characterSuggestReducer,
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

// ngx-translate
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    ApolloModule,
    HttpLinkModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
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
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
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
    LocaleService,
    ProgressService,
    Actions,
    AuthFacade,
    CharacterFacade,
    CharacterFiltersFacade,
    CharacterSuggestFacade,
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
