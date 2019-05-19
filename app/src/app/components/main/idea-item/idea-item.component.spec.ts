/**
 * Path of child
 *
 * Component - Idea - Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  ApolloStub,
  UserService,
  UserServiceStub,
} from '../../../services';
import { IdeaItemComponent } from './idea-item.component';

describe('IdeaItemComponent', () => {
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
        IdeaItemComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
        { provide: UserService, useClass: UserServiceStub },
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(IdeaItemComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
