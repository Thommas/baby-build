/**
 * Path of child
 *
 * App
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { AppComponent } from './app.component';
import {
  AngularticsService,
  AuthService,
  AuthServiceStub,
  BrowserService,
  BrowserServiceStub,
  LocaleService,
  RouterStub
} from './services';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        RouterTestingModule,
        MatProgressBarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AngularticsService,
        { provide: Angulartics2GoogleAnalytics, useMock: Angulartics2GoogleAnalytics },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: BrowserService, useClass: BrowserServiceStub },
        LocaleService,
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
