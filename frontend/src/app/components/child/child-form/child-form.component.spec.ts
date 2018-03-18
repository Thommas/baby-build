/**
 * Path of child
 *
 * Component - Child - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { ApolloStub, RouterStub } from '../../../services';
import { ChildFormComponent } from './child-form.component';

describe('ChildFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        FormsModule
      ],
      declarations: [
        ChildFormComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': 1 }]) } },
        { provide: Apollo, useClass: ApolloStub },
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(ChildFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
