/**
 * Path of child
 *
 * Component - Home
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatIconModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import {
  routing,
  HomeComponent,
  HomeAnonymousComponent,
  HomeParentComponent
} from './';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    routing,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: [
    HomeComponent,
    HomeAnonymousComponent,
    HomeParentComponent
  ]
})
export class HomeModule {
}
