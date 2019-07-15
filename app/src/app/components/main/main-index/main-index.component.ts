/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { IdeaFacade, IdeaFiltersFacade } from '../../../facade';

@Component({
  selector: 'app-main-index-cmp',
  templateUrl: './main-index.component.html',
  styleUrls: ['./main-index.component.scss']
})
export class MainIndexComponent {
  displayFilters: boolean;
  selectedIdea$ = this.ideaFacade.selectedIdea$;

  constructor(
    private ideaFacade: IdeaFacade,
    private ideaFiltersFacade: IdeaFiltersFacade
  ) {
    this.displayFilters = false;
  }

  createIdea() {
    this.ideaFiltersFacade.reset();
    this.ideaFacade.createIdea();
  }

  selectIdea(idea?: any) {
    this.ideaFacade.selectIdea(idea);
  }

  toggleFilters() {
    this.displayFilters = !this.displayFilters;
  }
}
