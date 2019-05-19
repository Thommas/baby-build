/**
 * Path of child
 *
 * Component - Idea - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Update } from '../../../store/idea-filters/idea-filters.actions';
import { ideaFiltersReducer } from '../../../store';

@Component({
  selector: 'app-idea-list-filters-cmp',
  templateUrl: './idea-list-filters.component.html',
  styleUrls: ['./idea-list-filters.component.scss']
})
export class IdeaListFiltersComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  filters$: any;
  ages: number[] = [];
  scores: number[] = [];

  constructor(private store: Store<{ ideaFilters: any }>) {
    this.filters$ = store.pipe(select('ideaFilters'));
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
    this.store.dispatch(new Update({
      label,
    }));
  }

  selectRequiredAge(requiredAge: number) {
    this.store.dispatch(new Update({
      requiredAge,
    }));
  }

  selectScore(score: number) {
    this.store.dispatch(new Update({
      score,
    }));
  }
}
