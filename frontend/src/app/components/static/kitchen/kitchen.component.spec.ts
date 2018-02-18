/**
 * Path of child
 *
 * Component - Static - Kitchen
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { TestBed, async } from '@angular/core/testing';
import { KitchenComponent } from './kitchen.component';

describe('KitchenComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KitchenComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
