/**
 * Path of child
 *
 * Store - Auth - Reducers
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { ActionTypes, ActionsUnion } from './auth.actions';

const initialState = {
  accessToken: null,
  idToken: null,
  expiresAt: null,
};

export function authReducer(state: any = initialState, action: ActionsUnion): any {
  switch (action.type) {
    case ActionTypes.LoginSuccess:
      return {
        ...action.payload,
      };

    case ActionTypes.LogoutSuccess:
      return {
        accessToken: null,
        idToken: null,
        expiresAt: null,
      };

    default:
      return state;
  }
}
