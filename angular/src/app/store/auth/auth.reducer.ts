/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { AuthActionTypes, AuthActionsUnion } from './auth.actions';

const initialState = {
  accessToken: null,
  idToken: null,
  expiresAt: null,
};

export function authReducer(state: any = initialState, action: AuthActionsUnion): any {
  switch (action.type) {
    case AuthActionTypes.AuthLoginSuccess:
      return {
        ...action.payload,
      };

    case AuthActionTypes.AuthLogoutSuccess:
      return {
        accessToken: null,
        idToken: null,
        expiresAt: null,
      };

    default:
      return state;
  }
}
