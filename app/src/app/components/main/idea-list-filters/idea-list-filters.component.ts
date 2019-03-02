/**
 * Path of child
 *
 * Component - Idea - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { xor } from 'lodash';
import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-idea-list-filters-cmp',
  templateUrl: './idea-list-filters.component.html',
  styleUrls: ['./idea-list-filters.component.scss']
})
export class IdeaListFiltersComponent implements OnInit {
  @Input() filters: any;
  @Output() filtersChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('inputElement') inputElement: any;
  ages: number[] = [];
  scores: number[] = [];

  constructor() {
    this.filters = {
      label: null,
      requiredAge: [],
      score: [],
    };
    for (let age = 1; age <= 20; age++) {
      this.ages.push(age);
    }
    for (let score = -3; score <= 3; score++) {
      this.scores.push(score);
    }
  }

  ngOnInit() {
    fromEvent(this.inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe((value: string) => this.selectLabel(value));
  }

  selectLabel(label: string) {
    this.filters.label = label;
    this.filtersChange.emit(this.filters);
  }

  selectRequiredAge(requiredAge: number) {
    this.filters.requiredAge = xor(this.filters.requiredAge, [requiredAge]);
    this.filtersChange.emit(this.filters);
  }

  selectScore(score: number) {
    this.filters.score = xor(this.filters.score, [score]);
    this.filtersChange.emit(this.filters);
  }
}
