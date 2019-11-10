/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum TagActionTypes {
  CreateTag = '[Tag] Create',
}

export class CreateTag implements Action {
  readonly type = TagActionTypes.CreateTag;

  constructor(public payload: any) {}
}

export type TagActionsUnion = CreateTag;
