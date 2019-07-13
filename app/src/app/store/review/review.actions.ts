/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum ReviewActionTypes {
  CreateReview = '[Review] Create',
  UpdateReview = '[Review] Update',
  SelectReview = '[Review] Select',
}

export class CreateReview implements Action {
  readonly type = ReviewActionTypes.CreateReview;

  constructor(public payload: any) {}
}

export class UpdateReview implements Action {
  readonly type = ReviewActionTypes.UpdateReview;

  constructor(public payload: any) {}
}

export class SelectReview implements Action {
  readonly type = ReviewActionTypes.SelectReview;

  constructor(public payload: any) {}
}

export type ReviewActionsUnion = CreateReview | UpdateReview | SelectReview;
