/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { xor } from 'lodash';
import { IdeaFiltersActionTypes, IdeaFiltersActionsUnion } from './idea-filters.actions';

const initialState = {
  label: null,
  language: null,
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
        label: action.payload.label !== undefined ? action.payload.label : state.label,
        score: action.payload.score !== undefined ? xor(state.score, [action.payload.score]) : state.score,
        requiredAge: action.payload.requiredAge !== undefined ? xor(state.requiredAge, [action.payload.requiredAge]) : state.requiredAge,
        language: action.payload.language !== undefined ? action.payload.language : state.language,
      };

    default:
      return state;
  }
}
