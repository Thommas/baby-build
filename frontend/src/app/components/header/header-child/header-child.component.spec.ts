/**
 * Path of child
 *
 * Component - Header - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { TestBed, async } from '@angular/core/testing';
import { HeaderChildComponent } from './header-child.component';

describe('HeaderChildComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderChildComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HeaderChildComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
