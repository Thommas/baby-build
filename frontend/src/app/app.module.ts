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
import { HomeModule } from './components/home/home.module';
import { KitchenModule } from './components/kitchen/kitchen.module';
import { WhitelistModule } from './components/whitelist/whitelist.module';
import { PageNotFoundModule } from './components/shared/page-not-found/page-not-found.module';
import { AuthGuardService, AuthService } from './services';

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
    HomeModule,
    KitchenModule,
    WhitelistModule,
    PageNotFoundModule
  ],
  providers: [
    appRoutingProviders,
    AuthGuardService,
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:4001/graphql' }),
      cache: new InMemoryCache()
    });
  }
}
