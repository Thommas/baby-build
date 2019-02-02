/**
 * Path of child
 *
 * Component - Idea - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { xor } from 'lodash';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-idea-list-filters-cmp',
  templateUrl: './idea-list-filters.component.html',
  styleUrls: ['./idea-list-filters.component.scss']
})
export class IdeaListFiltersComponent {
  @Input() filters: any;
  @Output() filtersChange: EventEmitter<any> = new EventEmitter<any>;
  ages: number[] = [];

  constructor() {
    this.filters = {
      requiredAge: [],
      score: [],
    };
    for (let age = 1; age <= 20; age++) {
      this.ages.push(age);
    }
  }

  selectRequiredAge(requiredAge: number) {
    this.filters.requiredAge = xor(this.filters.requiredAge, [requiredAge]);
    this.filtersChange.emit(this.filters);
  }
}
