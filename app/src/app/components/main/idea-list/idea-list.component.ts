/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { IdeaFacade } from '../../../facade';

@Component({
  selector: 'app-idea-list-cmp',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent {
  ideas$: any;

  constructor(
    private ideaFacade: IdeaFacade
  ) {
    this.ideas$ = this.ideaFacade.ideas$;
  }

  selectIdea(idea?: any) {
    this.ideaFacade.selectIdea(idea);
  }

  fetchMore() {
    this.ideaFacade.fetchMore();
  }
}
