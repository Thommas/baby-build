/**
 * Path of child
 *
 * Service - Translate - Stub
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';

@Injectable()
export class TranslateServiceStub {
  public get() {
    return observableOf({});
  }
}
