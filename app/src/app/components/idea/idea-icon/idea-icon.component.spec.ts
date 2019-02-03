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
import { ApolloStub } from '../../../services';
import { IdeaIconComponent } from './idea-icon.component';

describe('IdeaIconComponent', () => {
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
        IdeaIconComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(IdeaIconComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
