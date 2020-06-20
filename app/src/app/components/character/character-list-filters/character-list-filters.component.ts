/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CharacterFacade, CharacterFiltersFacade } from '../../../facade';
import { ConstantsService, FormService } from '../../../services';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character-list-filters-cmp',
  templateUrl: './character-list-filters.component.html',
  styleUrls: ['./character-list-filters.component.scss']
})
export class CharacterListFiltersComponent implements OnInit, OnDestroy {
  @ViewChild('inputElement') inputElement: any;
  filters$ = this.characterFiltersFacade.filters$;
  formFieldSub: Subscription;

  constructor(
    public constantsService: ConstantsService,
    public characterFacade: CharacterFacade,
    private formService: FormService,
    private characterFiltersFacade: CharacterFiltersFacade
  ) {
  }

  ngOnInit() {
    const operator = map((value: any) => this.selectLabel(value));
    this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement, operator);
  }

  ngOnDestroy() {
    this.formFieldSub.unsubscribe();
  }

  selectLabel(label: string) {
    this.characterFiltersFacade.selectLabel(label);
  }

  selectRequiredAge(requiredAge: number) {
    this.characterFiltersFacade.selectRequiredAge(requiredAge);
  }

  selectScore(score: number) {
    this.characterFiltersFacade.selectScore(score);
  }

  selectLanguage(language: string) {
    this.characterFiltersFacade.selectLanguage(language);
  }

  selectCategory(category: string) {
    this.characterFiltersFacade.selectCategory(category);
  }

  selectSort(sort: string) {
    this.characterFiltersFacade.selectSort(sort);
  }
}
