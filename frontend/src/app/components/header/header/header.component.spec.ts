/**
 * Path of child
 *
 * Component - Header
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService, AuthServiceStub } from '../../../services';

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
