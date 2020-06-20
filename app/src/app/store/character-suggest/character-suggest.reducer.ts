/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { CharacterSuggestActionTypes, CharacterSuggestActionsUnion } from './character-suggest.actions';

const initialState = {
  name: null,
  category: null,
};

export function characterSuggestReducer(state: any = initialState, action: CharacterSuggestActionsUnion): any {
  switch (action.type) {
    case CharacterSuggestActionTypes.ResetCharacterSuggest:
      return {};

    case CharacterSuggestActionTypes.SetCharacterSuggest:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
