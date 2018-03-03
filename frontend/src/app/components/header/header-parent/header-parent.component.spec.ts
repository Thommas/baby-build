/**
 * Path of child
 *
 * Component - Header - Parent
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { TestBed, async } from '@angular/core/testing';
import { HeaderParentComponent } from './header-parent.component';

describe('HeaderParentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderParentComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HeaderParentComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
