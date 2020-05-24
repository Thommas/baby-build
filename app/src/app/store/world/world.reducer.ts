/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { WorldActionTypes, WorldActionsUnion } from './world.actions';

const initialState = {
  fetchMoreLoading: false,
  selected: null,
};

export function worldReducer(state: any = initialState, action: WorldActionsUnion): any {
  switch (action.type) {
    case WorldActionTypes.FetchMoreWorldLoading:
      return {
        fetchMoreLoading: true
      };
    case WorldActionTypes.SelectWorld:
      return {
        selected: action.payload
      };

    default:
      return state;
  }
}
