/**
 * Path of child
 *
 * App
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { BuildModule } from './components/build/build.module';
import { HomeModule } from './components/home/home.module';
import { LazinessMeterModule } from './components/laziness-meter/laziness-meter.module';
import { LifeTutorialModule } from './components/life-tutorial/life-tutorial.module';
import { WhitelistModule } from './components/whitelist/whitelist.module';
import { PageNotFoundModule } from './components/shared/page-not-found/page-not-found.module';
import { AuthGuardService, AuthService } from './services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    routing,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    BuildModule,
    HomeModule,
    LazinessMeterModule,
    LifeTutorialModule,
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
export class AppModule { }
