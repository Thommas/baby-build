/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum IdeaActionTypes {
  SelectIdea = '[Idea] Select',
}

export class SelectIdea implements Action {
  readonly type = IdeaActionTypes.SelectIdea;

  constructor(public payload: any) {}
}

export type IdeaActionsUnion = SelectIdea;
