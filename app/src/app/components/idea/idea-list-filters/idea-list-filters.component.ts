/**
 * Path of child
 *
 * Component - Idea - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-idea-list-filters-cmp',
  templateUrl: './idea-list-filters.component.html',
  styleUrls: ['./idea-list-filters.component.scss']
})
export class IdeaListFiltersComponent {
  ages: number[] = [];

  constructor() {
    for (let age = 1; age <= 20; age++) {
      this.ages.push(age);
    }
  }

  selectRequiredAge() {

  }
}
