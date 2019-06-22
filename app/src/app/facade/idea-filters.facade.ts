/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  ResetIdeaFilters,
  UpdateIdeaFilters
} from '../store';

@Injectable()
export class IdeaFiltersFacade {
  filters$: Observable<any> = this.store.pipe(select('ideaFilters'));

  constructor(private store: Store<{ ideaFilters: any }>) {}

  selectTag(tag?: any) {
    this.store.dispatch(new UpdateIdeaFilters({
      tagId: tag ? tag.id : null,
    }));
  }

  selectLabel(label: string) {
    this.store.dispatch(new UpdateIdeaFilters({
      label,
    }));
  }

  selectRequiredAge(requiredAge: number) {
    this.store.dispatch(new UpdateIdeaFilters({
      requiredAge,
    }));
  }

  selectScore(score: number) {
    this.store.dispatch(new UpdateIdeaFilters({
      score,
    }));
  }

  reset(tag?: any) {
    this.store.dispatch(new ResetIdeaFilters());
  }
}
