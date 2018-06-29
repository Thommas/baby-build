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
import { FooterModule } from './components/footer/footer.module';
import { HeaderModule } from './components/header/header.module';
import { HomeModule } from './components/home/home.module';
import { StaticModule } from './components/static/static.module';
import { PageNotFoundModule } from './components/shared/page-not-found/page-not-found.module';
import {
  AngularticsService,
  BrowserService,
  DexieService,
  GoogleRecaptchaService,
  LocaleService,
  SeoService
} from './services';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
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
    FooterModule,
    HeaderModule,
    HomeModule,
    StaticModule,
    PageNotFoundModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
  ],
  providers: [
    appRoutingProviders,
    AngularticsService,
    BrowserService,
    DexieService,
    GoogleRecaptchaService,
    LocaleService,
    SeoService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
