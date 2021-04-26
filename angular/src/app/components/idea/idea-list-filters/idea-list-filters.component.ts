/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IdeaFacade, IdeaFiltersFacade } from '../../../facade';
import { ConstantsService, FormService } from '../../../services';
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

  constructor(
    public constantsService: ConstantsService,
    public ideaFacade: IdeaFacade,
    private formService: FormService,
    private ideaFiltersFacade: IdeaFiltersFacade
  ) {
  }

  ngOnInit() {
    // const operator = map((value: any) => this.selectLabel(value));
    // this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement, operator);
  }

  ngOnDestroy() {
    // this.formFieldSub.unsubscribe();
  }

  selectLabel(label: string) {
    this.ideaFiltersFacade.selectLabel(label);
  }

  selectRequiredAge(requiredAge: number) {
    this.ideaFiltersFacade.selectRequiredAge(requiredAge);
  }

  selectHasScore(hasScore: boolean) {
    this.ideaFiltersFacade.selectHasScore(hasScore);
  }

  selectScore(score: number) {
    this.ideaFiltersFacade.selectScore(score);
  }

  selectLanguage(language: string) {
    this.ideaFiltersFacade.selectLanguage(language);
  }

  selectCategory(category: string) {
    this.ideaFiltersFacade.selectCategory(category);
  }

  selectSort(sort: string) {
    this.ideaFiltersFacade.selectSort(sort);
  }
}
