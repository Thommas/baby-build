/**
 * Path of child
 *
 * Component - User - Sharing
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { ApolloStub } from '../../../services';
import { UserSharingComponent } from './user-sharing.component';

describe('UserSharingComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
      ],
      declarations: [
        UserSharingComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(UserSharingComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
