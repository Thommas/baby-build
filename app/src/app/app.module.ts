/**
 * Path of child
 *
 * App - Module - Browser
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { IdeaModule } from './components/idea/idea.module';
import { UserModule } from './components/user/user.module';
import { SecurityModule } from './components/security/security.module';
import { StaticModule } from './components/static/static.module';
import {
  BuildIndexComponent,
  SidebarComponent,
  TopbarComponent
} from './components/layout';
import {
  AngularticsService,
  ApolloService,
  AuthGuardService,
  AuthService,
  BrowserService,
  DexieService,
  LocaleService,
  UserService,
  ProgressService
} from './services';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BuildIndexComponent,
    SidebarComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'path-of-child' }),
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
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    IdeaModule,
    UserModule,
    SecurityModule,
    StaticModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
  ],
  providers: [
    appRoutingProviders,
    AngularticsService,
    ApolloService,
    AuthGuardService,
    AuthService,
    BrowserService,
    DexieService,
    LocaleService,
    UserService,
    ProgressService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(apolloService: ApolloService) {}
}