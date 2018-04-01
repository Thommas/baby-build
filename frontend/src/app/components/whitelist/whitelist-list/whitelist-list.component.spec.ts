/**
 * Path of child
 *
 * Component - Whitelist - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { ApolloStub, BuildService } from '../../../services';
import { WhitelistListComponent } from './whitelist-list.component';

describe('WhitelistListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        MatDialogModule
      ],
      declarations: [
        WhitelistListComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
        BuildService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(WhitelistListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
