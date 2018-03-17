/**
 * Path of child
 *
 * Service - Progress
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { TestScheduler } from 'rxjs/testing/TestScheduler';
import { ReactiveTest } from 'rx';
import { ProgressService } from './progress.service';

const onNext = ReactiveTest.onNext;
const onCompleted = ReactiveTest.onCompleted;
const subscribe = ReactiveTest.subscribe;

describe('ProgressService', () => {
  let service: ProgressService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProgressService
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(ProgressService);
    scheduler = new TestScheduler();
  });

  it('#trackObservable', () => {
    service.trackObservable(Observable.of(true));
  });
});
