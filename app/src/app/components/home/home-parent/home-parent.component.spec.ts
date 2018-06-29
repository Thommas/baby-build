/**
 * Path of child
 *
 * Component - Home - Home Parent
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import {
  BuildService,
  ChildService
} from '../../../services';
import { HomeParentComponent } from './home-parent.component';

describe('HomeParentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        HomeParentComponent
      ],
      providers: [
        BuildService,
        ChildService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HomeParentComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
