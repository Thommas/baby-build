/**
 * Path of child
 *
 * Service - Progress
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ProgressService } from './progress.service';

describe('ProgressService', () => {
  let service: ProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProgressService
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(ProgressService);
  });

  it('#trackObservable', () => {
    service.trackObservable(Observable.of(true));
  });
});
