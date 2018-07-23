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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
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
import {
  BrandingComponent,
  ContactComponent,
  FooterComponent,
  HeaderComponent,
  HomeComponent,
  TermsComponent,
  PageNotFoundComponent
} from './components';
import {
  AngularticsService,
  BrowserService,
  DexieService,
  GoogleRecaptchaService,
  HttpService,
  LocaleService,
  SeoService
} from './services';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BrandingComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    TermsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'path-of-child' }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
  ],
  providers: [
    appRoutingProviders,
    AngularticsService,
    BrowserService,
    DexieService,
    GoogleRecaptchaService,
    HttpService,
    LocaleService,
    SeoService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
