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
import { CharacterIndexComponent } from './character-index.component';

describe('CharacterIndexComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        CharacterIndexComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
        { provide: UserFacade },
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(CharacterIndexComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
