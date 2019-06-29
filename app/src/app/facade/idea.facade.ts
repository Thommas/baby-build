/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { flatMap, pluck, withLatestFrom, mergeMap } from 'rxjs/operators';
import {
  CreateIdeaMutation,
  DeleteIdeaMutation,
  GetIdeas
} from '../graphql';
import { ApolloService } from '../services';
import { IdeaActionTypes, CreateIdea, SelectIdea } from '../store';
import { IdeaFiltersFacade } from './idea-filters.facade';
import { UserFacade } from './user.facade';

@Injectable()
export class IdeaFacade {
  ideas$;
  selectedIdea$ = this.store.pipe(select('idea', 'selected'));

  constructor(
    private apolloService: ApolloService,
    private actions$: Actions,
    private ideaFiltersFacade: IdeaFiltersFacade,
    private userFacade: UserFacade,
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

        return this.apolloService.apolloClient.watchQuery<any>({
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

  createIdea() {
    this.store.dispatch(new CreateIdea());
  }

  @Effect({dispatch: false})
  createIdea$ = this.actions$
    .pipe(
      ofType(IdeaActionTypes.CreateIdea),
      withLatestFrom(this.userFacade.user$),
      mergeMap((args: any[]) => {
        const user: any = args[1];
        return this.apolloService.apolloClient.mutate({
          mutation: CreateIdeaMutation,
          optimisticResponse: {
            __typename: 'Mutation',
            createIdea: {
              __typename: 'Idea',
              id: -uuid(),
              label: null,
              icon: null,
              userId: user.id,
              user: {
                __typename: 'User',
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
              },
              requiredAge: 0,
              score: 0,
            },
          },
          update: (store, { data: { createIdea } }) => {
            if (!createIdea) {
              return;
            }
            const data: any = store.readQuery({ query: GetIdeas });
            const updatedIdeas: any = data.ideas;
            updatedIdeas.unshift(createIdea);
            store.writeQuery({ query: GetIdeas, data: { ideas: updatedIdeas } });
            // TODO Use a separate list for newly created items
          },
        });
      })
    );

  deleteIdea(idea: any) {
    this.apolloService.apolloClient.mutate({
      mutation: DeleteIdeaMutation,
      variables: {
        id: idea.id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteIdea: {
          __typename: 'Idea',
          id: idea.id
        },
      },
      update: (store, { data: { deleteIdea } }) => {
        if (!deleteIdea) {
          return;
        }
        const query: any = store.readQuery({ query: GetIdeas });
        const updatedIdeas: any[] = query.ideas.filter((idea: any) => idea.id && idea.id !== deleteIdea.id);
        store.writeQuery({ query: GetIdeas, data: { ideas: updatedIdeas }});
        idea.id = null;
      },
    }).subscribe();
  }

  selectIdea(idea: any) {
    this.store.dispatch(new SelectIdea(idea));
  }
}
