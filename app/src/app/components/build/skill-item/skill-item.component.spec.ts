/**
 * Path of child
 *
 * Component - Skill - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ApolloStub } from '../../../services';
import { SkillItemComponent } from './skill-item.component';

describe('SkillItemComponent', () => {
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
        SkillItemComponent
      ],
      providers: [
        { provide: Apollo, useClass: ApolloStub }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(SkillItemComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
