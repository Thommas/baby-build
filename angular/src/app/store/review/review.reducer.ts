/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { ReviewActionTypes, ReviewActionsUnion } from './review.actions';

const initialState = {
  selected: null,
};

export function reviewReducer(state: any = initialState, action: ReviewActionsUnion): any {
  switch (action.type) {
    case ReviewActionTypes.SelectReview:
      return {
        selected: action.payload
      };

    default:
      return state;
  }
}
