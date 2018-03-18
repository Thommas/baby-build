/**
 * Path of child
 *
 * Component - Child - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ApolloStub, ChildService, RouterStub } from '../../../services';
import { ChildIndexComponent } from './child-index.component';

describe('ChildIndexComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        ChildIndexComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
        ChildService,
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(ChildIndexComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
