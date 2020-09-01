/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { ApolloStub, AuthService, AuthServiceStub, RouterStub } from '../../../services';
import { UserSettingsComponent } from './user-settings.component';

describe('UserSettingsComponent', () => {
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
      ],
      declarations: [
        UserSettingsComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(UserSettingsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
