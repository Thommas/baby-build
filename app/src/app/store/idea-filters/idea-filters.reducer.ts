/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { IdeaFiltersActionTypes, IdeaFiltersActionsUnion } from './idea-filters.actions';

const initialState = {
  ideaInput: {
    label: null,
    language: null,
    requiredAge: null,
    score: null,
    category: null,
  },
  sort: null,
};

export function ideaFiltersReducer(state: any = initialState, action: IdeaFiltersActionsUnion): any {
  switch (action.type) {
    case IdeaFiltersActionTypes.ResetIdeaFilters:
      return {};

    case IdeaFiltersActionTypes.UpdateIdeaFilters:
      return {
        ...state,
        ideaInput: {
          label: action.payload.label !== undefined ? action.payload.label : state.ideaInput.label,
          score: action.payload.score !== undefined ? action.payload.score : state.ideaInput.score,
          requiredAge: action.payload.requiredAge !== undefined ? action.payload.requiredAge : state.ideaInput.requiredAge,
          language: action.payload.language !== undefined ? action.payload.language : state.ideaInput.language,
          category: action.payload.category !== undefined ? action.payload.category : state.ideaInput.category,
        },
        sort: action.payload.sort !== undefined ? action.payload.sort : state.sort,
      };

    default:
      return state;
  }
}
