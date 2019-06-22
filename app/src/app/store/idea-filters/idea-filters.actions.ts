/**
 * Path of child
 *
 * Store - Idea filters - Actions
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum IdeaFiltersActionTypes {
  UpdateIdeaFilters = '[IdeaFilters] Update',
  ResetIdeaFilters = '[IdeaFilters] Reset',
}

export class UpdateIdeaFilters implements Action {
  readonly type = IdeaFiltersActionTypes.UpdateIdeaFilters;

  constructor(public payload: any) {}
}

export class ResetIdeaFilters implements Action {
  readonly type = IdeaFiltersActionTypes.ResetIdeaFilters;
}

export type IdeaFiltersActionsUnion = UpdateIdeaFilters | ResetIdeaFilters;
