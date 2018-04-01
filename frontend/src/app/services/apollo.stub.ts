/**
 * Path of child
 *
 * Service - Apollo - Stub
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApolloStub {
  mutate() {
    // Do nothing
  }
  watchQuery() {
    return {
      valueChanges: Observable.of(true)
    };
  }
}
