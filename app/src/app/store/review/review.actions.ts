/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum ReviewActionTypes {
  SelectReview = '[Review] Select',
}

export class SelectReview implements Action {
  readonly type = ReviewActionTypes.SelectReview;

  constructor(public payload: any) {}
}

export type ReviewActionsUnion = SelectReview;
