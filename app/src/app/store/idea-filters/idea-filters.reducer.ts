/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { xor } from 'lodash';
import { IdeaFiltersActionTypes, IdeaFiltersActionsUnion } from './idea-filters.actions';

const initialState = {
  tagId: null,
  name: null,
  requiredAge: [],
  score: [],
};

export function ideaFiltersReducer(state: any = initialState, action: IdeaFiltersActionsUnion): any {
  switch (action.type) {
    case IdeaFiltersActionTypes.ResetIdeaFilters:
      return {};

    case IdeaFiltersActionTypes.UpdateIdeaFilters:
      return {
        ...state,
        tagId: action.payload.tagId !== undefined ? action.payload.tagId : state.tagId,
        name: action.payload.name !== undefined ? action.payload.name : state.name,
        score: action.payload.score !== undefined ? xor(state.score, [action.payload.score]) : state.score,
        requiredAge: action.payload.requiredAge !== undefined ? xor(state.requiredAge, [action.payload.requiredAge]) : state.requiredAge,
      };

    default:
      return state;
  }
}
