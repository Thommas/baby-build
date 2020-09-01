/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  ResetCharacterFilters,
  UpdateCharacterFilters
} from '../store';

@Injectable()
export class CharacterFiltersFacade {
  filters$: Observable<any> = this.store.pipe(select('characterFilters'));

  constructor(private store: Store<{ characterFilters: any }>) {}

  selectLanguage(language: string) {
    this.store.dispatch(new UpdateCharacterFilters({
      language,
    }));
  }

  selectLabel(label: string) {
    this.store.dispatch(new UpdateCharacterFilters({
      label,
    }));
  }

  selectRequiredAge(requiredAge: number) {
    this.store.dispatch(new UpdateCharacterFilters({
      requiredAge,
    }));
  }

  selectScore(score: number) {
    this.store.dispatch(new UpdateCharacterFilters({
      score,
    }));
  }

  selectCategory(category: string) {
    this.store.dispatch(new UpdateCharacterFilters({
      category,
    }));
  }

  selectSort(sort: string) {
    this.store.dispatch(new UpdateCharacterFilters({
      sort,
    }));
  }

  reset() {
    this.store.dispatch(new ResetCharacterFilters());
  }
}
