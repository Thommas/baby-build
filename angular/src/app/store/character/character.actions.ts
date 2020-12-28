/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum CharacterActionTypes {
  FetchMoreCharacter = '[Character] FetchMore',
  FetchMoreCharacterLoading = '[Character] FetchMore Loading',
  FetchMoreCharacterComplete = '[Character] FetchMore Complete',
  CreateCharacter = '[Character] Create',
  UpdateCharacter = '[Character] Update',
  SelectCharacter = '[Character] Select',
  DeleteCharacter = '[Character] Delete',
  AddFileCharacter = '[Character] Add File',
  RemoveFileCharacter = '[Character] Remove File',
}

export class FetchMoreCharacter implements Action {
  readonly type = CharacterActionTypes.FetchMoreCharacter;
}

export class FetchMoreCharacterLoading implements Action {
  readonly type = CharacterActionTypes.FetchMoreCharacterLoading;
}

export class FetchMoreCharacterComplete implements Action {
  readonly type = CharacterActionTypes.FetchMoreCharacterComplete;
}

export class CreateCharacter implements Action {
  readonly type = CharacterActionTypes.CreateCharacter;

  constructor(public payload: any) {}
}

export class UpdateCharacter implements Action {
  readonly type = CharacterActionTypes.UpdateCharacter;

  constructor(public payload: any) {}
}

export class SelectCharacter implements Action {
  readonly type = CharacterActionTypes.SelectCharacter;

  constructor(public payload: any) {}
}

export class DeleteCharacter implements Action {
  readonly type = CharacterActionTypes.DeleteCharacter;

  constructor() {}
}

export class AddFileCharacter implements Action {
  readonly type = CharacterActionTypes.AddFileCharacter;

  constructor(public payload: any) {}
}

export class RemoveFileCharacter implements Action {
  readonly type = CharacterActionTypes.RemoveFileCharacter;

  constructor(public payload: any) {}
}

export type CharacterActionsUnion =
  FetchMoreCharacter
  | FetchMoreCharacterLoading
  | FetchMoreCharacterComplete
  | CreateCharacter
  | UpdateCharacter
  | SelectCharacter
  | DeleteCharacter
  | AddFileCharacter
  | RemoveFileCharacter;
