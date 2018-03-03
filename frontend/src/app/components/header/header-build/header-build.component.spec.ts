/**
 * Path of child
 *
 * Component - Header - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { TestBed, async } from '@angular/core/testing';
import { HeaderBuildComponent } from './header-build.component';

describe('HeaderBuildComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderBuildComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HeaderBuildComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
