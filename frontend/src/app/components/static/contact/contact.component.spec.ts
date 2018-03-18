/**
 * Path of child
 *
 * Component - Static - Contact
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        FormsModule
      ],
      declarations: [
        ContactComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(ContactComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
