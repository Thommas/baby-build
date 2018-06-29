/**
 * Path of child
 *
 * Component - Task - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { TaskIndexComponent } from './task-index.component';

describe('TaskIndexComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        TaskIndexComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(TaskIndexComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
