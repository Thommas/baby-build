/**
 * Path of child
 *
 * Component - Build - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ApolloStub, RouterStub } from '../../../services';
import { BuildIndexComponent } from './build-index.component';

describe('BuildIndexComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        BuildIndexComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(BuildIndexComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
