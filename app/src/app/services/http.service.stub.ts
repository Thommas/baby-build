/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

@Injectable()
export class HttpServiceStub {
  post(url: string, body: any): Observable<any> {
    return observableOf(true);
  }
}
