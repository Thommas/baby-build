/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export class ProgressServiceStub {
  countChange: EventEmitter<number>;
  count: number;
  progress: number;
  timer: Observable<any>;
  timerSubscription: Subscription;

  trackObservable(obs: Observable<any>): Observable<any> {
    return obs;
  }
}
