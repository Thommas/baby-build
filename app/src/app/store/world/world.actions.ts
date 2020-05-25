/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum WorldActionTypes {
  FetchMoreWorld = '[World] FetchMore',
  FetchMoreWorldLoading = '[World] FetchMore Loading',
  FetchMoreWorldComplete = '[World] FetchMore Complete',
  GetWorld = '[World] Get',
  CreateWorld = '[World] Create',
  UpdateWorld = '[World] Update',
  SelectWorld = '[World] Select',
  DeleteWorld = '[World] Delete',
}

export class FetchMoreWorld implements Action {
  readonly type = WorldActionTypes.FetchMoreWorld;
}

export class FetchMoreWorldLoading implements Action {
  readonly type = WorldActionTypes.FetchMoreWorldLoading;
}

export class FetchMoreWorldComplete implements Action {
  readonly type = WorldActionTypes.FetchMoreWorldComplete;
}

export class GetWorld implements Action {
  readonly type = WorldActionTypes.GetWorld;

  constructor(public payload: any) {}
}

export class CreateWorld implements Action {
  readonly type = WorldActionTypes.CreateWorld;

  constructor(public payload: any) {}
}

export class UpdateWorld implements Action {
  readonly type = WorldActionTypes.UpdateWorld;

  constructor(public payload: any) {}
}

export class SelectWorld implements Action {
  readonly type = WorldActionTypes.SelectWorld;

  constructor(public payload: any) {}
}

export class DeleteWorld implements Action {
  readonly type = WorldActionTypes.DeleteWorld;

  constructor() {}
}

export type WorldActionsUnion =
  FetchMoreWorld
  | GetWorld
  | FetchMoreWorldLoading
  | FetchMoreWorldComplete
  | CreateWorld
  | UpdateWorld
  | SelectWorld
  | DeleteWorld;
