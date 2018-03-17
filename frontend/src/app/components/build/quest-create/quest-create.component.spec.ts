/**
 * Path of child
 *
 * Component - Build - Quest Create
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ApolloStub, BuildService, RouterStub } from '../../../services';
import { QuestCreateComponent } from './quest-create.component';

describe('QuestCreateComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        FormsModule
      ],
      declarations: [
        QuestCreateComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub },
        BuildService,
        { provide: Router, useClass: RouterStub }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(QuestCreateComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
