/**
 * Path of child
 *
 * Service - Auth - Stub
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthServiceStub {
  scheduleRenewal(): void {}
  get isAuthenticated(): Observable<boolean> {
    return Observable.of(true);
  }
}
