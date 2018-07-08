/**
 * Path of child
 *
 * Component - Static - Contact
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserService,
  BrowserServiceStub,
  GoogleRecaptchaService,
  HttpService,
  HttpServiceStub,
  SeoService,
  SeoServiceStub
} from '../../services';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        ContactComponent
      ],
      providers: [
        { provide: BrowserService, useClass: BrowserServiceStub },
        GoogleRecaptchaService,
        { provide: HttpService, useClass: HttpServiceStub },
        { provide: SeoService, useClass: SeoServiceStub }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(ContactComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
