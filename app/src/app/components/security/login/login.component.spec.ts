/**
 * Path of child
 *
 * Component - Security - Login
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AuthService, AuthServiceStub } from '../../../services';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { 'fragment': Observable.of('hash') } },
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
