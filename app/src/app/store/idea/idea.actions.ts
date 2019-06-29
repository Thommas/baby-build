/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum IdeaActionTypes {
  CreateIdea = '[Idea] Create',
  SelectIdea = '[Idea] Select',
}

export class CreateIdea implements Action {
  readonly type = IdeaActionTypes.CreateIdea;
}

export class SelectIdea implements Action {
  readonly type = IdeaActionTypes.SelectIdea;

  constructor(public payload: any) {}
}

export type IdeaActionsUnion = CreateIdea | SelectIdea;
