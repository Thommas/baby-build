/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Store, select } from '@ngrx/store';
import { flatMap, pluck } from 'rxjs/operators';
import { GetIdeas } from '../graphql';
import { SelectIdea } from '../store';
import { IdeaFiltersFacade } from './idea-filters.facade';

@Injectable()
export class IdeaFacade {
  ideas$;
  selectedIdea$ = this.store.pipe(select('idea', 'selected'));

  constructor(
    private apollo: Apollo,
    private ideaFiltersFacade: IdeaFiltersFacade,
    private store: Store<{ idea: any }>
  ) {
    this.ideas$ = this.ideaFiltersFacade.filters$.pipe(
      flatMap((filters: any) => {
        const currentFilters = Object.assign({}, filters);
        if (!currentFilters.requiredAge || 0 === currentFilters.requiredAge.length) {
          delete currentFilters.requiredAge;
        }
        if (!currentFilters.score || 0 === currentFilters.score.length) {
          delete currentFilters.score;
        }
        if (!currentFilters.tagId) {
          delete currentFilters.tagId;
        }
        if (!currentFilters.name) {
          delete currentFilters.name;
        }
  
        return this.apollo.watchQuery<any>({
          query: GetIdeas,
          variables: currentFilters,
        })
          .valueChanges
          .pipe(
            pluck('data', 'ideas')
          )
      })
    );
  }

  selectIdea(idea: any) {
    this.store.dispatch(new SelectIdea(idea));
  }
}
