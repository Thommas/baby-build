/**
 * Path of child
 *
 * Store - Auth - Actions
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum ActionTypes {
  LoginSuccess = '[Auth] Login',
  LogoutSuccess = '[Auth] Logout',
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.LoginSuccess;

  constructor(public payload: any) {}
}

export class LogoutSuccess implements Action {
  readonly type = ActionTypes.LogoutSuccess;
}

export type ActionsUnion = LoginSuccess | LogoutSuccess;
