/**
 * Path of child
 *
 * Service - User - Stub
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class UserServiceStub {
  get user$() {
    return of({
      id: 'User-id',
      firstName: 'Thomas',
      lastName: 'Neko',
    });
  }

  init() {}
}
