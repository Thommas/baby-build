/**
 * Path of child
 *
 * Component - Idea Tag Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { IdeaTagFacade, UserFacade } from '../../../facade';

@Component({
  selector: 'app-idea-tag-item-cmp',
  templateUrl: './idea-tag-item.component.html',
  styleUrls: ['./idea-tag-item.component.scss']
})
export class IdeaTagItemComponent {
  @Input() ideaTag: any;
  @Input() idea: any;

  constructor(
    private ideaTagFacade: IdeaTagFacade,
    public userFacade: UserFacade
  ) {}

  deleteIdeaTag() {
    this.ideaTagFacade.deleteIdeaTag(this.ideaTag, this.idea);
  }
}
