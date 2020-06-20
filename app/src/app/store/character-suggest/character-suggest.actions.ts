/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum CharacterSuggestActionTypes {
  SetCharacterSuggest = '[CharacterSuggest] Set',
  ResetCharacterSuggest = '[CharacterSuggest] Reset',
}

export class SetCharacterSuggest implements Action {
  readonly type = CharacterSuggestActionTypes.SetCharacterSuggest;

  constructor(public payload: any) {}
}

export class ResetCharacterSuggest implements Action {
  readonly type = CharacterSuggestActionTypes.ResetCharacterSuggest;
}

export type CharacterSuggestActionsUnion = SetCharacterSuggest | ResetCharacterSuggest;
