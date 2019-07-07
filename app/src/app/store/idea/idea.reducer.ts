/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { IdeaActionTypes, IdeaActionsUnion } from './idea.actions';

const initialState = {
  selected: null,
};

export function ideaReducer(state: any = initialState, action: IdeaActionsUnion): any {
  switch (action.type) {
    case IdeaActionTypes.SelectIdea:
      return {
        selected: action.payload
      };

    default:
      return state;
  }
}
