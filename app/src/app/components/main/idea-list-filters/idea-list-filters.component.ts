/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IdeaFiltersFacade } from '../../../facade';
import { FormService } from '../../../services';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-idea-list-filters-cmp',
  templateUrl: './idea-list-filters.component.html',
  styleUrls: ['./idea-list-filters.component.scss']
})
export class IdeaListFiltersComponent implements OnInit, OnDestroy {
  @ViewChild('inputElement') inputElement: any;
  filters$ = this.ideaFiltersFacade.filters$;
  formFieldSub: Subscription;
  ages: number[] = [];
  scores: number[] = [];

  constructor(
    private formService: FormService,
    private ideaFiltersFacade: IdeaFiltersFacade
  ) {
    for (let age = 1; age <= 20; age++) {
      this.ages.push(age);
    }
    for (let score = -3; score <= 3; score++) {
      this.scores.push(score);
    }
  }

  ngOnInit() {
    const operator = map((value: any) => this.selectLabel(value));
    this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement, operator);
  }

  ngOnDestroy() {
    this.formFieldSub.unsubscribe();
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
