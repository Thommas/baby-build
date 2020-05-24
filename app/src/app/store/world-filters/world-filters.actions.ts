/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum WorldFiltersActionTypes {
  UpdateWorldFilters = '[WorldFilters] Update',
  ResetWorldFilters = '[WorldFilters] Reset',
}

export class UpdateWorldFilters implements Action {
  readonly type = WorldFiltersActionTypes.UpdateWorldFilters;

  constructor(public payload: any) {}
}

export class ResetWorldFilters implements Action {
  readonly type = WorldFiltersActionTypes.ResetWorldFilters;
}

export type WorldFiltersActionsUnion = UpdateWorldFilters | ResetWorldFilters;
