/**
 * Path of child
 *
 * Component - Idea - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IdeaFacade } from '../../../facade';

@Component({
  selector: 'app-idea-show-cmp',
  templateUrl: './idea-show.component.html',
  styleUrls: ['./idea-show.component.scss']
})
export class IdeaShowComponent {
  selectedIdea$ = this.ideaFacade.selectedIdea$;

  constructor(
    private apollo: Apollo,
    private ideaFacade: IdeaFacade
  ) {}
}
