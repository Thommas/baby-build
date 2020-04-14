/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum IdeaActionTypes {
  FetchMoreIdea = '[Idea] FetchMore',
  CreateIdea = '[Idea] Create',
  UpdateIdea = '[Idea] Update',
  SelectIdea = '[Idea] Select',
}

export class FetchMoreIdea implements Action {
  readonly type = IdeaActionTypes.FetchMoreIdea;
}

export class CreateIdea implements Action {
  readonly type = IdeaActionTypes.CreateIdea;

  constructor(public payload: any) {}
}

export class UpdateIdea implements Action {
  readonly type = IdeaActionTypes.UpdateIdea;

  constructor(public payload: any) {}
}

export class SelectIdea implements Action {
  readonly type = IdeaActionTypes.SelectIdea;

  constructor(public payload: any) {}
}

export type IdeaActionsUnion = FetchMoreIdea | CreateIdea | UpdateIdea | SelectIdea;
