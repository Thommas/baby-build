/**
 * Path of child
 *
 * Component - Terms
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import {
  SeoService,
  SeoServiceStub
} from '../../services';
import { TermsComponent } from './terms.component';

describe('TermsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        TermsComponent
      ],
      providers: [
        { provide: SeoService, useClass: SeoServiceStub }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(TermsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
