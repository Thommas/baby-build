/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { WorldFiltersActionTypes, WorldFiltersActionsUnion } from './world-filters.actions';

const initialState = {
  ideaInput: {
    label: null,
  },
  sort: null,
};

export function worldFiltersReducer(state: any = initialState, action: WorldFiltersActionsUnion): any {
  switch (action.type) {
    case WorldFiltersActionTypes.ResetWorldFilters:
      return {};

    case WorldFiltersActionTypes.UpdateWorldFilters:
      return {
        ...state,
        ideaInput: {
          label: action.payload.label !== undefined ? action.payload.label : state.ideaInput.label,
        },
        sort: action.payload.sort !== undefined ? action.payload.sort : state.sort,
      };

    default:
      return state;
  }
}
