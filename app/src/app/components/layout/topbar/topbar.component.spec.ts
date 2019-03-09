/**
 * Path of child
 *
 * Component - Topbar
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AuthService, AuthServiceStub } from '../../../services';
import { TopbarComponent } from './topbar.component';
import { MatDialogModule, MatMenuModule } from '@angular/material';

describe('TopbarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        TopbarComponent,
      ],
      imports: [
        MatDialogModule,
        MatMenuModule,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(TopbarComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
