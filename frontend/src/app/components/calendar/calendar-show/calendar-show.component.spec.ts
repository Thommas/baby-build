/**
 * Path of child
 *
 * Component - Calendar - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { ApolloStub, BuildService } from '../../../services';
import { CalendarShowComponent } from './calendar-show.component';

describe('CalendarShowComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        MatDialogModule
      ],
      declarations: [
        CalendarShowComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
        BuildService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(CalendarShowComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
