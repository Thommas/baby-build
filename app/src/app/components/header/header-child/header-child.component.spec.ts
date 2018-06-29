/**
 * Path of child
 *
 * Component - Header - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material';
import { ChildService } from '../../../services';
import { HeaderChildComponent } from './header-child.component';

describe('HeaderChildComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        MatMenuModule
      ],
      declarations: [
        HeaderChildComponent
      ],
      providers: [
        ChildService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HeaderChildComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
