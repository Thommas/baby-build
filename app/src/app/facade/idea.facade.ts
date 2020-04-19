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
import { flatMap, map, withLatestFrom, mergeMap, tap } from 'rxjs/operators';
import {
  CreateIdeaMutation,
  DeleteIdeaMutation,
  GetIdeas,
  UpdateIdeaMutation
} from '../graphql';
import { ApolloService } from '../services';
import {
  IdeaActionTypes,
  FetchMoreIdea,
  CreateIdea,
  UpdateIdea,
  SelectIdea,
  SelectReview,
  DeleteIdea
} from '../store';
import { IdeaFiltersFacade } from './idea-filters.facade';
import { IdeaSuggestFacade } from './idea-suggest.facade';
import { UserFacade } from './user.facade';
import { QueryRef } from 'apollo-angular';

export const purifyFilters = (filters: any) => {
  const currentFilters = Object.assign({}, filters);
  if (!currentFilters.requiredAge || 0 === currentFilters.requiredAge.length) {
    delete currentFilters.requiredAge;
  }
  if (!currentFilters.score || 0 === currentFilters.score.length) {
    delete currentFilters.score;
  }
  if (!currentFilters.name) {
    delete currentFilters.name;
  }

  return {
    ideaInput: currentFilters,
    cursor: '-1',
  };
}

@Injectable()
export class IdeaFacade {
  suggestedIdeaQuery: QueryRef<any> = null;
  ideaQuery: QueryRef<any> = null;
  static total: number = null;
  static cursor: any;

  suggestedIdeas$ = this.ideaSuggestFacade.suggest$.pipe(
    flatMap((suggest: any) => {
      if (null === suggest.name) {
        return of([]);
      }
      this.suggestedIdeaQuery = this.apolloService.apolloClient.watchQuery<any>({
        query: GetIdeas,
        variables: {
          ideaInput: {
            label: suggest.name,
            count: 25,
          }
        },
      });
      return this.suggestedIdeaQuery
        .valueChanges
        .pipe(
          map((response: any) => {
            IdeaFacade.total = response.data.ideas.total;
            IdeaFacade.cursor = response.data.ideas.cursor;
            return response.data.ideas.nodes;
          }),
        );
    })
  );
  newIdeas = [];
  ideas$ = this.ideaFiltersFacade.filters$.pipe(
    flatMap((filters: any) => {
      this.ideaQuery = this.apolloService.apolloClient.watchQuery<any>({
        query: GetIdeas,
        variables: purifyFilters(filters),
      });
      return this.ideaQuery
        .valueChanges
        .pipe(
          map((response: any) => {
            IdeaFacade.total = response.data.ideas.total;
            IdeaFacade.cursor = response.data.ideas.cursor;
            return response.data.ideas.nodes;
          }),
        );
    })
  );
  selectedIdea$ = this.store.pipe(select('idea', 'selected'));
  ideasHasMore$ = this.ideas$.pipe(
    map((ideas: any) => IdeaFacade.total !== 0 && ideas.length !== IdeaFacade.total),
  );

  constructor(
    private actions$: Actions,
    private apolloService: ApolloService,
    private ideaFiltersFacade: IdeaFiltersFacade,
    private ideaSuggestFacade: IdeaSuggestFacade,
    private userFacade: UserFacade,
    private store: Store<{ idea: any }>
  ) {
  }

  fetchMore() {
    this.store.dispatch(new FetchMoreIdea());
  }

  @Effect({dispatch: false})
  fetchMoreIdea$ = this.actions$
    .pipe(
      ofType(IdeaActionTypes.FetchMoreIdea),
      withLatestFrom(
        this.ideaFiltersFacade.filters$,
        this.ideas$
      ),
      mergeMap((args: any[]) => {
        const filters = args[1];
        const ideas = args[2];
        const variables = purifyFilters(filters);
        variables.cursor = IdeaFacade.cursor;

        if (!this.ideaQuery) {
          return of(EMPTY);
        }
        if (ideas.length === IdeaFacade.total) {
          return of(EMPTY);
        }
        this.ideaQuery.fetchMore({
          query: GetIdeas,
          variables,
          updateQuery: (prev, { fetchMoreResult }) => {
            IdeaFacade.cursor = fetchMoreResult.ideas.cursor;
            return {
              ideas: {
                total: fetchMoreResult.ideas.total,
                cursor: fetchMoreResult.ideas.cursor,
                nodes: [
                  ...prev.ideas.nodes,
                  ...fetchMoreResult.ideas.nodes,
                ],
                __typename: "IdeaEdge",
              },
            };
          },
        });
        return of(EMPTY);
      })
    );

  createIdea(idea: any) {
    this.store.dispatch(new CreateIdea(idea));
  }

  @Effect({dispatch: false})
  createIdea$ = this.actions$
    .pipe(
      ofType(IdeaActionTypes.CreateIdea),
      withLatestFrom(
        this.userFacade.user$,
        this.ideaFiltersFacade.filters$
      ),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        const filters = args[2];
        if (!user) {
          return of(EMPTY);
        }
        return this.apolloService.apolloClient.mutate({
          mutation: CreateIdeaMutation,
          variables: {
            ...action.payload,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            optimistic: true,
            createIdea: {
              __typename: 'Idea',
              id: `-${uuid()}`,
              ...action.payload,
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
          update: (store, { data: { createIdea, optimistic } }) => {
            if (!createIdea) {
              return;
            }
            const data: any = store.readQuery({
              query: GetIdeas,
              variables: purifyFilters(filters)
            });
            const updatedIdeas: any = data.ideas.nodes;
            updatedIdeas.unshift(createIdea);
            store.writeQuery({
              query: GetIdeas,
              variables: purifyFilters(filters),
              data: {
                ideas: {
                  total: IdeaFacade.total,
                  cursor: IdeaFacade.cursor,
                  nodes: updatedIdeas,
                  __typename: "IdeaEdge",
                }
              }
            });
            // TODO Use a separate list for newly created items
            this.selectIdea(createIdea);
            if (optimistic) {
              this.newIdeas.push(createIdea);
            }
          },
        });
      })
    );

  updateIdea(data: any) {
    this.store.dispatch(new UpdateIdea(data));
  }

  @Effect({dispatch: false})
  updateIdea$ = this.actions$
    .pipe(
      ofType(IdeaActionTypes.UpdateIdea),
      withLatestFrom(
        this.userFacade.user$,
        this.selectedIdea$
      ),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        const selectedIdea: any = args[2];
        if (!user || !selectedIdea) {
          return of(EMPTY);
        }
        if (action.payload.category && action.payload.category !== 'videogame') {
          action.payload.platform = null;
        }
        return this.apolloService.apolloClient.mutate({
          mutation: UpdateIdeaMutation,
          variables: {
            id: selectedIdea.id,
            ...action.payload
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateIdea: {
              __typename: 'Idea',
              ...selectedIdea,
              ...action.payload,
            },
          },
          update: (store: any, { data: { updateIdea } }) => {
            if (!updateIdea) {
              return;
            }
            const idea = store.data.get(`Idea:${updateIdea.id}`);
            if (idea) {
              Object.assign(idea, updateIdea);
              Object.assign(selectedIdea, updateIdea);
              store.writeData(idea);
            }
          }
        });
      })
    );

  deleteIdea() {
    this.store.dispatch(new DeleteIdea());
  }

  @Effect({dispatch: false})
  deleteIdea$ = this.actions$
    .pipe(
      ofType(IdeaActionTypes.DeleteIdea),
      withLatestFrom(
        this.selectedIdea$
      ),
      mergeMap((args: any[]) => {
        const selectedIdea: any = args[1];
        if (!selectedIdea) {
          return of(EMPTY);
        }
        return this.apolloService.apolloClient.mutate({
          mutation: DeleteIdeaMutation,
          variables: {
            id: selectedIdea.id
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteIdea: {
              __typename: 'Idea',
              id: selectedIdea.id
            },
          },
          update: (store, { data: { deleteIdea } }) => {
            if (!deleteIdea) {
              return;
            }
            const query: any = store.readQuery({ query: GetIdeas });
            const updatedIdeas: any[] = query.ideas.filter((idea: any) => idea.id && idea.id !== deleteIdea.id);
            store.writeQuery({ query: GetIdeas, data: { ideas: updatedIdeas }});
          },
        }).pipe(
          tap(() => {
          this.store.dispatch(new SelectIdea(null));
        }));
      })
    );

  selectIdea(idea: any) {
    this.store.dispatch(new SelectReview(null));
    this.store.dispatch(new SelectIdea(idea));
  }
}
