/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum FileActionTypes {
  SetFile = '[File] Set',
}

export class SetFile implements Action {
  readonly type = FileActionTypes.SetFile;

  constructor(public payload: any) {}
}

export type FileActionsUnion = SetFile;
