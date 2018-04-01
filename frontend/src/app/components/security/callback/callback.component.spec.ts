/**
 * Path of child
 *
 * Component - Security - Callback
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AuthService, AuthServiceStub } from '../../../services';
import { CallbackComponent } from './callback.component';

describe('CallbackComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        CallbackComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { 'fragment': Observable.of('hash') } },
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(CallbackComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
