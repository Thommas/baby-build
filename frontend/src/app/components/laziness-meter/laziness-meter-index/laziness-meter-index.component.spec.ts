/**
 * Path of child
 *
 * Component - LazinessMeter - LazinessMeter Parent
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { TestBed, async } from '@angular/core/testing';
import { LazinessMeterIndexComponent } from './laziness-meter-index.component';

describe('LazinessMeterIndexComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LazinessMeterIndexComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
