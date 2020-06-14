/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { IdeaFacade, WorldFacade } from '../../../facade';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-idea-list-cmp',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent {
  ideas$: any;
  fetchMoreLoading$ = this.ideaFacade.fetchMoreLoading$;

  constructor(
    private ideaFacade: IdeaFacade,
    private worldFacade: WorldFacade
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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer.id === 'list-2') {
      const idea = event.item.data;
      this.worldFacade.removeIdea(idea.id);
    }
  }
}
