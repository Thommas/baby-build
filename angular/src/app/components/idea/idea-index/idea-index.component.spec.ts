/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { UserFacade } from '../../../facade';
import { ApolloStub } from '../../../services';
import { IdeaIndexComponent } from './idea-index.component';

describe('IdeaIndexComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        IdeaIndexComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
        { provide: UserFacade },
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(IdeaIndexComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
