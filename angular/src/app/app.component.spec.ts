/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {
  AuthService,
  AuthServiceStub,
  BrowserService,
  BrowserServiceStub,
  ProgressService,
  ProgressServiceStub,
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
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: BrowserService, useClass: BrowserServiceStub },
        { provide: ProgressService, useClass: ProgressServiceStub },
        { provide: Router, useClass: RouterStub },
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
