/**
 * Path of child
 *
 * Facade - Idea Filters
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import {
  AuthLoginSuccess,
  AuthLogoutSuccess
} from '../store';

@Injectable()
export class AuthFacade {
  idToken$: Observable<string> = this.store.pipe(pluck('auth', 'idToken'));
  expiresAt$: Observable<string> = this.store.pipe(pluck('auth', 'expiresAt'));

  constructor(private store: Store<{ auth: any }>) {}

  loginSuccess(accessToken: string, idToken: string, expiresAt: string) {
    this.store.dispatch(new AuthLoginSuccess({
      accessToken,
      idToken,
      expiresAt,
    }));
  }

  logoutSuccess() {
    this.store.dispatch(new AuthLogoutSuccess());
  }
}
