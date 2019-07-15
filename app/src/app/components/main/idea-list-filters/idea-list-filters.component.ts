/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IdeaFiltersFacade } from '../../../facade';

@Component({
  selector: 'app-idea-list-filters-cmp',
  templateUrl: './idea-list-filters.component.html',
  styleUrls: ['./idea-list-filters.component.scss']
})
export class IdeaListFiltersComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  filters$ = this.ideaFiltersFacade.filters$;
  ages: number[] = [];
  scores: number[] = [];

  constructor(private ideaFiltersFacade: IdeaFiltersFacade) {
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
    this.ideaFiltersFacade.selectLabel(label);
  }

  selectRequiredAge(requiredAge: number) {
    this.ideaFiltersFacade.selectRequiredAge(requiredAge);
  }

  selectScore(score: number) {
    this.ideaFiltersFacade.selectScore(score);
  }
}
