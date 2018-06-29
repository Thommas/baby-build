/**
 * Path of child
 *
 * Component - Static - Branding
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import {
  SeoService,
  SeoServiceStub
} from '../../../services';
import { BrandingComponent } from './branding.component';

describe('BrandingComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        BrandingComponent
      ],
      providers: [
        { provide: SeoService, useClass: SeoServiceStub }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(BrandingComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
