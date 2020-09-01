/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */
/* tslint:disable:no-unused-variable */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PageNotFoundComponent } from './page-not-found.component';

class RouterStub {
  navigate(url: string) {}
}

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        FlexLayoutModule,
        BrowserAnimationsModule
      ],
      declarations: [
        PageNotFoundComponent
      ],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onBack', () => {
    component.onBack();
  });
});
