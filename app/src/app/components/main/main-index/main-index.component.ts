/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { IdeaFacade } from '../../../facade';

@Component({
  selector: 'app-main-index-cmp',
  templateUrl: './main-index.component.html',
  styleUrls: ['./main-index.component.scss']
})
export class MainIndexComponent {
  displayFilters: boolean;
  selectedIdea$ = this.ideaFacade.selectedIdea$;
  categories: any = this.ideaFacade.categories;
  getCategoryIconByValue = this.ideaFacade.getCategoryIconByValue;

  constructor(
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
}
