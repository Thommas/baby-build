/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { CharacterFiltersActionTypes, CharacterFiltersActionsUnion } from './character-filters.actions';

const initialState = {
  characterInput: {
    label: null,
    language: null,
    requiredAge: null,
    score: null,
    category: null,
  },
  sort: null,
};

export function characterFiltersReducer(state: any = initialState, action: CharacterFiltersActionsUnion): any {
  switch (action.type) {
    case CharacterFiltersActionTypes.ResetCharacterFilters:
      return {};

    case CharacterFiltersActionTypes.UpdateCharacterFilters:
      return {
        ...state,
        characterInput: {
          label: action.payload.label !== undefined ? action.payload.label : state.characterInput.label,
          score: action.payload.score !== undefined ? action.payload.score : state.characterInput.score,
          requiredAge: action.payload.requiredAge !== undefined ? action.payload.requiredAge : state.characterInput.requiredAge,
          language: action.payload.language !== undefined ? action.payload.language : state.characterInput.language,
          category: action.payload.category !== undefined ? action.payload.category : state.characterInput.category,
        },
        sort: action.payload.sort !== undefined ? action.payload.sort : state.sort,
      };

    default:
      return state;
  }
}
