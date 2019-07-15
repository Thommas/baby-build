/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum UserActionTypes {
  UpdateUser = '[User] Update',
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateUser;

  constructor(public payload: any) {}
}

export type UserActionsUnion = UpdateUser;
