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
  AddAudioCharacter = '[Character] Add Audio',
  RemoveAudioCharacter = '[Character] Remove Audio',
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

export class AddAudioCharacter implements Action {
  readonly type = CharacterActionTypes.AddAudioCharacter;

  constructor(public payload: any) {}
}

export class RemoveAudioCharacter implements Action {
  readonly type = CharacterActionTypes.RemoveAudioCharacter;

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
  | AddAudioCharacter
  | RemoveAudioCharacter;
