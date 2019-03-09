/**
 * Path of child
 *
 * Component - User - Edit
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule } from '@angular/material';
import { Apollo } from 'apollo-angular';
import {
  ApolloStub,
  UserService,
  UserServiceStub
} from '../../../services';
import { UserEditComponent } from './user-edit.component';

describe('UserEditComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
      ],
      declarations: [
        UserEditComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
        { provide: UserService, useClass: UserServiceStub },
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(UserEditComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
