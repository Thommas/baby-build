/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { IdeaFiltersActionTypes, IdeaFiltersActionsUnion } from './idea-filters.actions';

const initialState = {
  label: null,
  language: null,
  requiredAge: null,
  score: null,
};

export function ideaFiltersReducer(state: any = initialState, action: IdeaFiltersActionsUnion): any {
  switch (action.type) {
    case IdeaFiltersActionTypes.ResetIdeaFilters:
      return {};

    case IdeaFiltersActionTypes.UpdateIdeaFilters:
      return {
        ...state,
        label: action.payload.label !== undefined ? action.payload.label : state.label,
        score: action.payload.score !== undefined ? action.payload.score : state.score,
        requiredAge: action.payload.requiredAge !== undefined ? action.payload.requiredAge : state.requiredAge,
        language: action.payload.language !== undefined ? action.payload.language : state.language,
      };

    default:
      return state;
  }
}
