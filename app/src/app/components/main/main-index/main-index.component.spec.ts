/**
 * Path of child
 *
 * Component - Idea - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable, from } from 'rxjs';
import { ApolloStub, RouterStub } from '../../../services';
import { MainIndexComponent } from './main-index.component';

describe('BuildShowComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        MainIndexComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { 'params': from([{ 'id': 1 }]) } },
        { provide: Apollo, useClass: ApolloStub },
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MainIndexComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
