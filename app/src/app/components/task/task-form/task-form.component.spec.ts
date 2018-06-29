/**
 * Path of child
 *
 * Component - Task - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ApolloStub, BuildService } from '../../../services';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
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
        TaskFormComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
        BuildService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(TaskFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
