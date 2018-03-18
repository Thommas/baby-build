/**
 * Path of child
 *
 * Component - Header
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  MatMenuModule,
  MatOptionModule,
  MatDividerModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AuthService } from '../../services';
import { XpToLevelUpPipe } from '../../pipes';

import {
  HeaderComponent,
  HeaderBuildComponent,
  HeaderChildComponent,
  HeaderUserComponent
} from './';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatMomentDateModule,
    MatIconModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    XpToLevelUpPipe
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent,
    HeaderBuildComponent,
    HeaderChildComponent,
    HeaderUserComponent
  ],
  providers: [
    AuthService
  ]
})
export class HeaderModule {
}
