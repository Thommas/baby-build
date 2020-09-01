/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  AuthLoginSuccess = '[Auth] Login',
  AuthLogoutSuccess = '[Auth] Logout',
}

export class AuthLoginSuccess implements Action {
  readonly type = AuthActionTypes.AuthLoginSuccess;

  constructor(public payload: any) {}
}

export class AuthLogoutSuccess implements Action {
  readonly type = AuthActionTypes.AuthLogoutSuccess;
}

export type AuthActionsUnion = AuthLoginSuccess | AuthLogoutSuccess;
