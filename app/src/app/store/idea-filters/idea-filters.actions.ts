/**
 * Path of child
 *
 * Store - Idea filters - Actions
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum ActionTypes {
  Update = '[IdeaFilters] Update',
  Reset = '[IdeaFilters] Reset',
}

export class Update implements Action {
  readonly type = ActionTypes.Update;

  constructor(public payload: any) {}
}

export class Reset implements Action {
  readonly type = ActionTypes.Reset;
}

export type ActionsUnion = Update | Reset;
