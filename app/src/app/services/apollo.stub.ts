/**
 * Path of child
 *
 * Service - Apollo - Stub
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

@Injectable()
export class ApolloStub {
  mutate() {
    // Do nothing
  }
  watchQuery() {
    return {
      valueChanges: observableOf(true)
    };
  }
}
