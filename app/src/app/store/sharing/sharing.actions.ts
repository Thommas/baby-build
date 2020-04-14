/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum SharingActionTypes {
  CreateSharing = '[Sharing] Create',
  DeleteSharing = '[Sharing] Delete',
}

export class CreateSharing implements Action {
  readonly type = SharingActionTypes.CreateSharing;

  constructor(public payload: any) {}
}

export class DeleteSharing implements Action {
  readonly type = SharingActionTypes.DeleteSharing;

  constructor(public payload: any) {}
}

export type SharingActionsUnion = CreateSharing | DeleteSharing;
