/**
 * Path of child
 *
 * Component - Header - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { ApolloStub, AuthService, AuthServiceStub, UserService } from '../../../services';
import { XpToLevelUpPipe } from '../../../pipes';
import { HeaderUserComponent } from './header-user.component';

describe('HeaderUserComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        MatMenuModule
      ],
      declarations: [
        HeaderUserComponent,
        XpToLevelUpPipe
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
        { provide: AuthService, useClass: AuthServiceStub },
        UserService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HeaderUserComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
