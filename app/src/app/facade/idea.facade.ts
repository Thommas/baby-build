/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { flatMap, pluck, withLatestFrom, mergeMap } from 'rxjs/operators';
import {
  CreateIdeaMutation,
  DeleteIdeaMutation,
  GetIdeas,
  UpdateIdeaMutation
} from '../graphql';
import { ApolloService } from '../services';
import { IdeaActionTypes, CreateIdea, UpdateIdea, SelectIdea } from '../store';
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
        if (!user) {
          return of(EMPTY);
        }
        console.log('user', user);
        return this.apolloService.apolloClient.mutate({
          mutation: CreateIdeaMutation,
          optimisticResponse: {
            __typename: 'Mutation',
            createIdea: {
              __typename: 'Idea',
              id: `-${uuid()}`,
              label: null,
              icon: null,
              userId: user.id,
              user: {
                __typename: 'User',
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

  @Effect({dispatch: false})
  updateIdea$ = this.actions$
    .pipe(
      ofType(IdeaActionTypes.UpdateIdea),
      withLatestFrom(this.userFacade.user$),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        console.log('action', action);
        if (!user) {
          return of(EMPTY);
        }
        return this.apolloService.apolloClient.mutate({
          mutation: UpdateIdeaMutation,
          variables: action.payload,
          optimisticResponse: {
            __typename: 'Mutation',
            updateIdea: {
              __typename: 'Idea',
              ...action.payload,
              userId: user.id,
              user: {
                __typename: 'User',
                firstName: user.firstName,
                lastName: user.lastName,
              },
              requiredAge: 0,
              score: 0,
            },
          },
          update: (store, { data: { updateIdea } }) => {
            if (!updateIdea) {
              return;
            }
            const query: any = store.readQuery({ query: GetIdeas });
            const updatedIdeas: any[] = query.ideas.map((idea: any) => idea.id === updateIdea.id ? {
              ...idea,
              label: updateIdea.label,
            } : idea);
            store.writeQuery({ query: GetIdeas, data: { ideas: updatedIdeas }});
            // this.idea.label = updateIdea.label;
          }
        });
      })
    );

  updateIdea(data: any) {
    this.store.dispatch(new UpdateIdea(data));
  }

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
