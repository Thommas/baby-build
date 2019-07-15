/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { IdeaFiltersFacade, TagFacade } from '../../../facade';

@Component({
  selector: 'app-tag-list-cmp',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent {
  filters$ = this.ideaFiltersFacade.filters$;
  tags$ = this.tagFacade.tags$;

  constructor(
    private ideaFiltersFacade: IdeaFiltersFacade,
    private tagFacade: TagFacade
  ) {}

  selectTag(tag?: any) {
    this.ideaFiltersFacade.selectTag(tag);
  }
}
