/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum IdeaSuggestActionTypes {
  SetIdeaSuggest = '[IdeaSuggest] Set',
  ResetIdeaSuggest = '[IdeaSuggest] Reset',
}

export class SetIdeaSuggest implements Action {
  readonly type = IdeaSuggestActionTypes.SetIdeaSuggest;

  constructor(public payload: any) {}
}

export class ResetIdeaSuggest implements Action {
  readonly type = IdeaSuggestActionTypes.ResetIdeaSuggest;
}

export type IdeaSuggestActionsUnion = SetIdeaSuggest | ResetIdeaSuggest;
