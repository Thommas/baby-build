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
import { mergeMap, map, withLatestFrom, tap } from 'rxjs/operators';
import {
  CreateCharacterMutation,
  DeleteCharacterMutation,
  GetCharacters,
  UpdateCharacterMutation,
  AddFileCharacterMutation,
  RemoveFileCharacterMutation,
} from '../graphql';
import { ApolloService } from '../services';
import {
  CharacterActionTypes,
  FetchMoreCharacter,
  FetchMoreCharacterLoading,
  FetchMoreCharacterComplete,
  CreateCharacter,
  UpdateCharacter,
  SelectCharacter,
  SelectReview,
  DeleteCharacter,
  AddFileCharacter,
  RemoveFileCharacter,
} from '../store';
import { CharacterFiltersFacade } from './character-filters.facade';
import { CharacterSuggestFacade } from './character-suggest.facade';
import { UserFacade } from './user.facade';
import { QueryRef } from 'apollo-angular';

@Injectable()
export class CharacterFacade {
  suggestedCharacterQuery: QueryRef<any> = null;
  characterQuery: QueryRef<any> = null;
  static total: number = null;
  static page: any;
  ages: number[] = [];
  scores: number[] = [];

  suggestedCharacters$ = this.characterSuggestFacade.suggest$.pipe(
    mergeMap((suggest: any) => {
      if (null === suggest.name) {
        return of([]);
      }
      this.suggestedCharacterQuery = this.apolloService.apolloClient.watchQuery<any>({
        query: GetCharacters,
        variables: {
          characterInput: {
            label: suggest.name,
            category: suggest.category,
            count: 5,
          }
        },
      });
      return this.suggestedCharacterQuery
        .valueChanges
        .pipe(
          map((response: any) => {
            CharacterFacade.total = response.data.characters.total;
            CharacterFacade.page = response.data.characters.page;
            return response.data.characters.nodes;
          }),
        );
    })
  );
  newCharacters = [];
  characters$ = this.characterFiltersFacade.filters$.pipe(
    mergeMap((filters: any) => {
      this.characterQuery = this.apolloService.apolloClient.watchQuery<any>({
        query: GetCharacters,
        variables: this.purifyFilters(filters),
      });
      return this.characterQuery
        .valueChanges
        .pipe(
          map((response: any) => {
            CharacterFacade.total = response.data.characters.total;
            CharacterFacade.page = response.data.characters.page;
            return response.data.characters.nodes;
          }),
        );
    })
  );
  fetchMoreLoading$ = this.store.pipe(select('character', 'fetchMoreLoading'));
  selectedCharacter$ = this.store.pipe(select('character', 'selected'));
  charactersHasMore$ = this.characters$.pipe(
    map((characters: any) => CharacterFacade.total !== 0 && characters.length !== CharacterFacade.total),
  );

  constructor(
    private actions$: Actions,
    private apolloService: ApolloService,
    private characterFiltersFacade: CharacterFiltersFacade,
    private characterSuggestFacade: CharacterSuggestFacade,
    private userFacade: UserFacade,
    private store: Store<{ character: any }>
  ) {
    for (let age = 1; age <= 20; age++) {
      this.ages.push(age);
    }
    for (let score = 1; score <= 7; score++) {
      this.scores.push(score);
    }
  }

  purifyFilters(filters: any) {
    const currentFilters = Object.assign({}, filters.characterInput);
    if (!currentFilters.requiredAge || 0 === currentFilters.requiredAge.length) {
      delete currentFilters.requiredAge;
    }
    if (!currentFilters.score || 0 === currentFilters.score.length) {
      delete currentFilters.score;
    }
    if (!currentFilters.label) {
      delete currentFilters.label;
    }
    if (!currentFilters.language) {
      delete currentFilters.language;
    }
    if (!currentFilters.category) {
      delete currentFilters.category;
    }

    return {
      characterInput: currentFilters,
      page: 1,
      sort: filters.sort ? filters.sort : undefined,
    };
  }

  fetchMore() {
    this.store.dispatch(new FetchMoreCharacter());
  }

  @Effect({dispatch: false})
  fetchMoreCharacter$ = this.actions$
    .pipe(
      ofType(CharacterActionTypes.FetchMoreCharacter),
      withLatestFrom(
        this.characterFiltersFacade.filters$,
        this.characters$
      ),
      mergeMap((args: any[]) => {
        const filters = args[1];
        const characters = args[2];
        const variables = this.purifyFilters(filters);
        variables.page = CharacterFacade.page;

        if (!this.characterQuery) {
          return of(EMPTY);
        }
        if (characters.length === CharacterFacade.total) {
          return of(EMPTY);
        }
        this.characterQuery.fetchMore({
          query: GetCharacters,
          variables,
          updateQuery: (prev, { fetchMoreResult }) => {
            CharacterFacade.page = fetchMoreResult.characters.page;
            this.store.dispatch(new FetchMoreCharacterComplete());
            return {
              characters: {
                total: fetchMoreResult.characters.total,
                page: fetchMoreResult.characters.page,
                nodes: [
                  ...prev.characters.nodes,
                  ...fetchMoreResult.characters.nodes,
                ],
                __typename: "CharacterEdge",
              },
            };
          },
        });
        this.store.dispatch(new FetchMoreCharacterLoading());
        return of(EMPTY);
      }),
    );

  createCharacter(character: any) {
    this.store.dispatch(new CreateCharacter(character));
  }

  @Effect({dispatch: false})
  createCharacter$ = this.actions$
    .pipe(
      ofType(CharacterActionTypes.CreateCharacter),
      withLatestFrom(
        this.userFacade.user$,
        this.characterFiltersFacade.filters$
      ),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        const filters = args[2];
        if (!user) {
          return of(EMPTY);
        }
        return this.apolloService.apolloClient.mutate({
          mutation: CreateCharacterMutation,
          variables: {
            ...action.payload,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            optimistic: true,
            createCharacter: {
              __typename: 'Character',
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
          update: (store, { data: { createCharacter, optimistic } }: any) => {
            if (!createCharacter) {
              return;
            }
            const data: any = store.readQuery({
              query: GetCharacters,
              variables: this.purifyFilters(filters)
            });
            const updatedCharacters: any = data.characters.nodes;
            updatedCharacters.unshift(createCharacter);
            store.writeQuery({
              query: GetCharacters,
              variables: this.purifyFilters(filters),
              data: {
                characters: {
                  total: CharacterFacade.total,
                  page: CharacterFacade.page,
                  nodes: updatedCharacters,
                  __typename: "CharacterEdge",
                }
              }
            });
            // TODO Use a separate list for newly created items
            this.selectCharacter(createCharacter);
            if (optimistic) {
              this.newCharacters.unshift(createCharacter);
            }
          },
        });
      })
    );

  updateCharacter(data: any) {
    this.store.dispatch(new UpdateCharacter(data));
  }

  @Effect({dispatch: false})
  updateCharacter$ = this.actions$
    .pipe(
      ofType(CharacterActionTypes.UpdateCharacter),
      withLatestFrom(
        this.userFacade.user$,
        this.selectedCharacter$
      ),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        const selectedCharacter: any = args[2];
        if (!user || !selectedCharacter) {
          return of(EMPTY);
        }
        if (action.payload.category && action.payload.category !== 'videogame') {
          action.payload.platform = null;
        }
        return this.apolloService.apolloClient.mutate({
          mutation: UpdateCharacterMutation,
          variables: {
            id: selectedCharacter.id,
            ...action.payload
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateCharacter: {
              __typename: 'Character',
              ...selectedCharacter,
              ...action.payload,
            },
          },
          update: (store: any, { data: { updateCharacter } }: any) => {
            if (!updateCharacter) {
              return;
            }
            const character = store.data.get(`Character:${updateCharacter.id}`);
            if (character) {
              Object.assign(character, updateCharacter);
              Object.assign(selectedCharacter, updateCharacter);
              store.writeData(character);
            }
          }
        });
      })
    );

  deleteCharacter() {
    this.store.dispatch(new DeleteCharacter());
  }

  @Effect({dispatch: false})
  deleteCharacter$ = this.actions$
    .pipe(
      ofType(CharacterActionTypes.DeleteCharacter),
      withLatestFrom(
        this.selectedCharacter$
      ),
      mergeMap((args: any[]) => {
        const selectedCharacter: any = args[1];
        if (!selectedCharacter) {
          return of(EMPTY);
        }
        return this.apolloService.apolloClient.mutate({
          mutation: DeleteCharacterMutation,
          variables: {
            id: selectedCharacter.id
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteCharacter: {
              __typename: 'Character',
              id: selectedCharacter.id
            },
          },
          update: (store, { data: { deleteCharacter } }: any) => {
            if (!deleteCharacter) {
              return;
            }
            const query: any = store.readQuery({ query: GetCharacters });
            const updatedCharacters: any[] = query.characters.filter((character: any) => character.id && character.id !== deleteCharacter.id);
            store.writeQuery({ query: GetCharacters, data: { characters: updatedCharacters }});
          },
        }).pipe(
          tap(() => {
          this.store.dispatch(new SelectCharacter(null));
        }));
      })
    );

  selectCharacter(character: any) {
    this.store.dispatch(new SelectReview(null));
    this.store.dispatch(new SelectCharacter(character));
  }

  addFile(data: any) {
    this.store.dispatch(new AddFileCharacter(data));
  }

  @Effect({dispatch: false})
  addFile$ = this.actions$
    .pipe(
      ofType(CharacterActionTypes.AddFileCharacter),
      withLatestFrom(
        this.userFacade.user$,
        this.selectedCharacter$
      ),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        const selectedCharacter: any = args[2];
        if (!user || !selectedCharacter) {
          return of(EMPTY);
        }
        return this.apolloService.apolloClient.mutate({
          mutation: AddFileCharacterMutation,
          variables: {
            id: selectedCharacter.id,
            ...action.payload
          },
          update: (store: any, { data: { addFile } }: any) => {
            if (!addFile) {
              return;
            }
            const character = store.data.get(`Character:${addFile.id}`);
            if (character) {
              character.files = addFile.files;
              store.writeData(character);
              this.selectCharacter(character);
            }
          }
        });
      })
    );

  removeFile(data: any) {
    this.store.dispatch(new RemoveFileCharacter(data));
  }

  @Effect({dispatch: false})
  removeFile$ = this.actions$
    .pipe(
      ofType(CharacterActionTypes.RemoveFileCharacter),
      withLatestFrom(
        this.userFacade.user$,
        this.selectedCharacter$
      ),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        const selectedCharacter: any = args[2];
        if (!user || !selectedCharacter) {
          return of(EMPTY);
        }
        return this.apolloService.apolloClient.mutate({
          mutation: RemoveFileCharacterMutation,
          variables: {
            id: selectedCharacter.id,
            ...action.payload
          },
          update: (store: any, { data: { removeFile } }: any) => {
            if (!removeFile) {
              return;
            }
            const character = store.data.get(`Character:${removeFile.id}`);
            if (character) {
              character.files = removeFile.files;
              store.writeData(character);
              this.selectCharacter(character);
            }
          }
        });
      })
    );
}
