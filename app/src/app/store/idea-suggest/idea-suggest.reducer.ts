/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { IdeaSuggestActionTypes, IdeaSuggestActionsUnion } from './idea-suggest.actions';

const initialState = {
  name: null,
};

export function ideaSuggestReducer(state: any = initialState, action: IdeaSuggestActionsUnion): any {
  switch (action.type) {
    case IdeaSuggestActionTypes.ResetIdeaSuggest:
      return {};

    case IdeaSuggestActionTypes.SetIdeaSuggest:
      return {
        ...state,
        name: action.payload.name,
      };

    default:
      return state;
  }
}
