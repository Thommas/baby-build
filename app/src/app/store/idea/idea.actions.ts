/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum IdeaActionTypes {
  FetchMoreIdea = '[Idea] FetchMore',
  FetchMoreIdeaLoading = '[Idea] FetchMore Loading',
  FetchMoreIdeaComplete = '[Idea] FetchMore Complete',
  CreateIdea = '[Idea] Create',
  UpdateIdea = '[Idea] Update',
  SelectIdea = '[Idea] Select',
  DeleteIdea = '[Idea] Delete',
}

export class FetchMoreIdea implements Action {
  readonly type = IdeaActionTypes.FetchMoreIdea;
}

export class FetchMoreIdeaLoading implements Action {
  readonly type = IdeaActionTypes.FetchMoreIdeaLoading;
}

export class FetchMoreIdeaComplete implements Action {
  readonly type = IdeaActionTypes.FetchMoreIdeaComplete;
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

export class DeleteIdea implements Action {
  readonly type = IdeaActionTypes.DeleteIdea;

  constructor() {}
}

export type IdeaActionsUnion =
  FetchMoreIdea
  | FetchMoreIdeaLoading
  | FetchMoreIdeaComplete
  | CreateIdea
  | UpdateIdea
  | SelectIdea
  | DeleteIdea;
