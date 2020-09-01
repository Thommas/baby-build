/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum CharacterFiltersActionTypes {
  UpdateCharacterFilters = '[CharacterFilters] Update',
  ResetCharacterFilters = '[CharacterFilters] Reset',
}

export class UpdateCharacterFilters implements Action {
  readonly type = CharacterFiltersActionTypes.UpdateCharacterFilters;

  constructor(public payload: any) {}
}

export class ResetCharacterFilters implements Action {
  readonly type = CharacterFiltersActionTypes.ResetCharacterFilters;
}

export type CharacterFiltersActionsUnion = UpdateCharacterFilters | ResetCharacterFilters;
