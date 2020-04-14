/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { EventEmitter } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

export class ProgressService {
  countChange: EventEmitter<number>;
  count: number;
  progress: number;
  timer: Observable<any>;
  timerSubscription: Subscription;

  constructor() {
    this.countChange = new EventEmitter<number>();
    this.count = 0;
    this.progress = 0;
  }

  /**
   * Adds a new observable
   */
  trackObservable(obs: Observable<any>): Observable<any> {
    if (this.count === 0) {
      this.startTimer();
    }
    this.count++;
    this.countChange.emit(this.count);
    return obs.pipe(
      map((res) => this.handleProcessingResponse(res)),
      catchError((error) => this.handleProcessingError(error))
    );
  }

  /**
   * Handles observable response
   */
  protected handleProcessingResponse(res: any): any {
    this.count--;
    if (this.count === 0) {
      this.stopTimer();
    }
    this.countChange.emit(this.count);
    return res;
  }

  /**
   * Handles observable error
   */
  protected handleProcessingError(error: any): any {
    this.count--;
    if (this.count === 0) {
      this.stopTimer();
    }
    this.countChange.emit(this.count);
    return Observable.throw(error);
  }

  /**
   * Setup a timer to increment progress
   */
  protected startTimer() {
    this.timer = timer(100, 100).pipe(take(100));
    this.timerSubscription = this.timer.subscribe(
      x => {
        this.incrementProgress();
      },
      err => {
        this.timerSubscription.unsubscribe();
      },
      () => {
        this.incrementProgress();
      }
    );
  }

  /**
   * Increment progress
   */
  protected incrementProgress() {
    if (this.progress < 50) {
      this.progress += 5;
    } else {
      this.progress += (100 - this.progress) / 5;
    }
  }

  /**
   * Stop the timer to increment progress
   */
  protected stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.progress = 0;
  }
}
