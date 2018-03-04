/**
 * Path of child
 *
 * Component - Build - Create
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { Apollo } from 'apollo-angular';
import { BuildCreateComponent } from './build-create.component';
import { ApolloStub, RouterStub } from '../../../services'

describe('BuildCreateComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        FormsModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        BuildCreateComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(BuildCreateComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
