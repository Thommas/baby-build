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
  fetchMoreLoading$ = this.ideaFacade.fetchMoreLoading$;
  page = IdeaFacade.page;

  constructor(
    private ideaFacade: IdeaFacade
  ) {
    this.ideas$ = this.ideaFacade.ideas$;
  }

  selectIdea(idea?: any) {
    this.ideaFacade.selectIdea(idea);
  }

  onScroll(event) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 100) {
      this.ideaFacade.fetchMore();
    }
  }
}
