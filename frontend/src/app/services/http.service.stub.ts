/**
 * Path of child
 *
 * Service - Http - Stub
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpServiceStub {
  post(url: string, body: any): Observable<any> {
    return Observable.of(true);
  }
}
