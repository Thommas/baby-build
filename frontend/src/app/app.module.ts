/**
 * Path of child
 *
 * App
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { BuildModule } from './components/build/build.module';
import { ChildModule } from './components/child/child.module';
import { FooterModule } from './components/footer/footer.module';
import { HeaderModule } from './components/header/header.module';
import { HomeModule } from './components/home/home.module';
import { ParentModule } from './components/parent/parent.module';
import { SecurityModule } from './components/security/security.module';
import { StaticModule } from './components/static/static.module';
import { WhitelistModule } from './components/whitelist/whitelist.module';
import { PageNotFoundModule } from './components/shared/page-not-found/page-not-found.module';
import {
  ApolloService,
  AuthGuardService,
  AuthService,
  BrowserService,
  ChildService
} from './services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
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
    BuildModule,
    ChildModule,
    FooterModule,
    HeaderModule,
    HomeModule,
    ParentModule,
    SecurityModule,
    StaticModule,
    WhitelistModule,
    PageNotFoundModule
  ],
  providers: [
    appRoutingProviders,
    ApolloService,
    AuthGuardService,
    AuthService,
    BrowserService,
    ChildService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(apolloService: ApolloService) {}
}
