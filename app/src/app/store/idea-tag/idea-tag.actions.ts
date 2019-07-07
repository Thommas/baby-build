/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Action } from '@ngrx/store';

export enum IdeaTagActionTypes {
  CreateIdeaTag = '[IdeaTag] Create',
  DeleteIdeaTag = '[IdeaTag] Delete',
}

export class CreateIdeaTag implements Action {
  readonly type = IdeaTagActionTypes.CreateIdeaTag;

  constructor(public payload: any) {}
}

export class DeleteIdeaTag implements Action {
  readonly type = IdeaTagActionTypes.DeleteIdeaTag;

  constructor(public payload: any) {}
}

export type IdeaTagActionsUnion = CreateIdeaTag | DeleteIdeaTag;
