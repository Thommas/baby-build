/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { IdeaFacade } from '../../../facade';
import { ConstantsService } from '../../../services';

@Component({
  selector: 'app-idea-index-cmp',
  templateUrl: './idea-index.component.html',
  styleUrls: ['./idea-index.component.scss']
})
export class IdeaIndexComponent {
  displayFilters: boolean;
  selectedIdea$ = this.ideaFacade.selectedIdea$;

  constructor(
    public constantsService: ConstantsService,
    private ideaFacade: IdeaFacade
  ) {
    this.displayFilters = false;
  }

  selectIdea(idea?: any) {
    this.ideaFacade.selectIdea(idea);
  }

  toggleFilters() {
    this.displayFilters = !this.displayFilters;
  }

  selectCategory(category: string) {
    this.ideaFacade.updateIdea({
      category
    });
  }

  refreshList() {
    this.ideaFacade.ideaQuery.refetch();
  }
}
