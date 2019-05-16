/**
 * Path of child
 *
 * Store - Idea filters - Reducers
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { xor } from 'lodash';
import { Action, State } from '@ngrx/store';
import { ActionTypes, ActionsUnion } from './idea-filters.actions';

export const initialState = {
  tagId: null,
  name: null,
  requiredAge: [],
  score: [],
};

export function ideaFiltersReducer(state: any = initialState, action: ActionsUnion): any {
  switch (action.type) {
    case ActionTypes.Reset:
      return {};

    case ActionTypes.Update:
      return {
        ...state,
        tagId: action.payload.tagId ? action.payload.tagId : state.tagId,
        name: action.payload.name ? action.payload.name : state.name,
        score: action.payload.score !== undefined ? xor(state.score, [action.payload.score]) : state.score,
        requiredAge: action.payload.requiredAge ? xor(state.requiredAge, [action.payload.requiredAge]) : state.requiredAge,
      };

    default:
      return state;
  }
}
