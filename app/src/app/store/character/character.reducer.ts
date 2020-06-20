/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { CharacterActionTypes, CharacterActionsUnion } from './character.actions';

const initialState = {
  fetchMoreLoading: false,
  selected: null,
};

export function characterReducer(state: any = initialState, action: CharacterActionsUnion): any {
  switch (action.type) {
    case CharacterActionTypes.FetchMoreCharacterLoading:
      return {
        fetchMoreLoading: true
      };
    case CharacterActionTypes.SelectCharacter:
      return {
        selected: action.payload
      };

    default:
      return state;
  }
}
