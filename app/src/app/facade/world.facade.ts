/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of, from } from 'rxjs';
import { flatMap, map, withLatestFrom, mergeMap, tap } from 'rxjs/operators';
import {
  CreateWorldMutation,
  DeleteWorldMutation,
  GetWorlds,
  UpdateWorldMutation
} from '../graphql';
import { ApolloService } from '../services';
import {
  WorldActionTypes,
  FetchMoreWorld,
  FetchMoreWorldLoading,
  FetchMoreWorldComplete,
  CreateWorld,
  UpdateWorld,
  SelectWorld,
  DeleteWorld
} from '../store';
import { WorldFiltersFacade } from './world-filters.facade';
import { UserFacade } from './user.facade';
import { QueryRef } from 'apollo-angular';

@Injectable()
export class WorldFacade {
  worldQuery: QueryRef<any> = null;
  static total: number = null;
  static cursor: any;
  ages: number[] = [];
  scores: number[] = [];

  newWorlds = [];
  worlds$ = this.worldFiltersFacade.filters$.pipe(
    flatMap((filters: any) => {
      this.worldQuery = this.apolloService.apolloClient.watchQuery<any>({
        query: GetWorlds,
        variables: this.purifyFilters(filters),
      });
      return this.worldQuery
        .valueChanges
        .pipe(
          map((response: any) => {
            WorldFacade.total = response.data.worlds.total;
            WorldFacade.cursor = response.data.worlds.cursor;
            return response.data.worlds.nodes;
          }),
        );
    })
  );
  fetchMoreLoading$ = this.store.pipe(select('world', 'fetchMoreLoading'));
  selectedWorld$ = this.store.pipe(select('world', 'selected'));
  worldsHasMore$ = this.worlds$.pipe(
    map((worlds: any) => WorldFacade.total !== 0 && worlds.length !== WorldFacade.total),
  );

  constructor(
    private actions$: Actions,
    private apolloService: ApolloService,
    private worldFiltersFacade: WorldFiltersFacade,
    private userFacade: UserFacade,
    private store: Store<{ world: any }>
  ) {
  }

  purifyFilters(filters: any) {
    const currentFilters = Object.assign({}, filters.ideaInput);
    if (!currentFilters.label) {
      delete currentFilters.label;
    }

    return {
      ideaInput: currentFilters,
      cursor: '-1',
      sort: filters.sort ? filters.sort : undefined,
    };
  }

  fetchMore() {
    this.store.dispatch(new FetchMoreWorld());
  }

  @Effect({dispatch: false})
  fetchMoreWorld$ = this.actions$
    .pipe(
      ofType(WorldActionTypes.FetchMoreWorld),
      withLatestFrom(
        this.worldFiltersFacade.filters$,
        this.worlds$
      ),
      mergeMap((args: any[]) => {
        const filters = args[1];
        const worlds = args[2];
        const variables = this.purifyFilters(filters);
        variables.cursor = WorldFacade.cursor;

        if (!this.worldQuery) {
          return of(EMPTY);
        }
        if (worlds.length === WorldFacade.total) {
          return of(EMPTY);
        }
        this.worldQuery.fetchMore({
          query: GetWorlds,
          variables,
          updateQuery: (prev, { fetchMoreResult }) => {
            WorldFacade.cursor = fetchMoreResult.worlds.cursor;
            this.store.dispatch(new FetchMoreWorldComplete());
            return {
              worlds: {
                total: fetchMoreResult.worlds.total,
                cursor: fetchMoreResult.worlds.cursor,
                nodes: [
                  ...prev.worlds.nodes,
                  ...fetchMoreResult.worlds.nodes,
                ],
                __typename: "WorldEdge",
              },
            };
          },
        });
        this.store.dispatch(new FetchMoreWorldLoading());
        return of(EMPTY);
      }),
    );

  createWorld(world: any) {
    this.store.dispatch(new CreateWorld(world));
  }

  @Effect({dispatch: false})
  createWorld$ = this.actions$
    .pipe(
      ofType(WorldActionTypes.CreateWorld),
      withLatestFrom(
        this.userFacade.user$,
        this.worldFiltersFacade.filters$
      ),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        const filters = args[2];
        if (!user) {
          return of(EMPTY);
        }
        return this.apolloService.apolloClient.mutate({
          mutation: CreateWorldMutation,
          variables: {
            ...action.payload,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            optimistic: true,
            createWorld: {
              __typename: 'World',
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
          update: (store, { data: { createWorld, optimistic } }) => {
            if (!createWorld) {
              return;
            }
            const data: any = store.readQuery({
              query: GetWorlds,
              variables: this.purifyFilters(filters)
            });
            const updatedWorlds: any = data.worlds.nodes;
            updatedWorlds.unshift(createWorld);
            store.writeQuery({
              query: GetWorlds,
              variables: this.purifyFilters(filters),
              data: {
                worlds: {
                  total: WorldFacade.total,
                  cursor: WorldFacade.cursor,
                  nodes: updatedWorlds,
                  __typename: "WorldEdge",
                }
              }
            });
            // TODO Use a separate list for newly created items
            this.selectWorld(createWorld);
            if (optimistic) {
              this.newWorlds.unshift(createWorld);
            }
          },
        });
      })
    );

  updateWorld(data: any) {
    this.store.dispatch(new UpdateWorld(data));
  }

  @Effect({dispatch: false})
  updateWorld$ = this.actions$
    .pipe(
      ofType(WorldActionTypes.UpdateWorld),
      withLatestFrom(
        this.userFacade.user$,
        this.selectedWorld$
      ),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        const selectedWorld: any = args[2];
        if (!user || !selectedWorld) {
          return of(EMPTY);
        }
        if (action.payload.category && action.payload.category !== 'videogame') {
          action.payload.platform = null;
        }
        return this.apolloService.apolloClient.mutate({
          mutation: UpdateWorldMutation,
          variables: {
            id: selectedWorld.id,
            ...action.payload
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateWorld: {
              __typename: 'World',
              ...selectedWorld,
              ...action.payload,
            },
          },
          update: (store: any, { data: { updateWorld } }) => {
            if (!updateWorld) {
              return;
            }
            const world = store.data.get(`World:${updateWorld.id}`);
            if (world) {
              Object.assign(world, updateWorld);
              Object.assign(selectedWorld, updateWorld);
              store.writeData(world);
            }
          }
        });
      })
    );

  deleteWorld() {
    this.store.dispatch(new DeleteWorld());
  }

  @Effect({dispatch: false})
  deleteWorld$ = this.actions$
    .pipe(
      ofType(WorldActionTypes.DeleteWorld),
      withLatestFrom(
        this.selectedWorld$
      ),
      mergeMap((args: any[]) => {
        const selectedWorld: any = args[1];
        if (!selectedWorld) {
          return of(EMPTY);
        }
        return this.apolloService.apolloClient.mutate({
          mutation: DeleteWorldMutation,
          variables: {
            id: selectedWorld.id
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteWorld: {
              __typename: 'World',
              id: selectedWorld.id
            },
          },
          update: (store, { data: { deleteWorld } }) => {
            if (!deleteWorld) {
              return;
            }
            const query: any = store.readQuery({ query: GetWorlds });
            const updatedWorlds: any[] = query.worlds.filter((world: any) => world.id && world.id !== deleteWorld.id);
            store.writeQuery({ query: GetWorlds, data: { worlds: updatedWorlds }});
          },
        }).pipe(
          tap(() => {
          this.store.dispatch(new SelectWorld(null));
        }));
      })
    );

  selectWorld(world: any) {
    this.store.dispatch(new SelectWorld(world));
  }
}
