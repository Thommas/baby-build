/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, of } from 'rxjs';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { pluck, withLatestFrom, mergeMap } from 'rxjs/operators';
import { GetTags, CreateTagMutation } from '../graphql';
import { ApolloService } from '../services';
import { TagActionTypes, CreateTag } from '../store';
import { UserFacade } from './user.facade';

@Injectable()
export class TagFacade {
  tags$: Observable<any> = this.apolloService.apolloClient.watchQuery<any>({
    query: GetTags,
  })
    .valueChanges
    .pipe(
      pluck('data', 'tags')
    );

  constructor(
    private actions$: Actions,
    private apolloService: ApolloService,
    private userFacade: UserFacade,
    private store: Store<{ tag: any }>
  ) {}

  getTagsByLabel(label: string) {
    return this.apolloService.apolloClient.watchQuery<any>({
      query: GetTags,
      variables: {
        label,
      },
    })
      .valueChanges
      .pipe(
        pluck('data', 'tags')
      );
  }

  createTag(data: any) {
    this.store.dispatch(new CreateTag(data));
  }

  @Effect({dispatch: false})
  createTag$ = this.actions$
    .pipe(
      ofType(TagActionTypes.CreateTag),
      withLatestFrom(
        this.userFacade.user$
      ),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        if (!user) {
          return of(EMPTY);
        }
        return this.apolloService.apolloClient.mutate({
          mutation: CreateTagMutation,
          variables: {
            label: action.payload.label,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createTag: {
              __typename: 'Tag',
              id: `-${uuid()}`,
              label: action.payload.label,
              user: {
                ...user,
                __typename: "User",
              },
              userId: user.id
            },
          },
          update: (store, { data: { createTag } }) => {
            if (!createTag) {
              return;
            }
            this.addToTags(store, createTag);
          },
        });
      })
    );

  addToTags(store: any, createdTag: any) {
    const query: any = store.readQuery({
      query: GetTags,
    });
    query.tags.push(createdTag);
    store.writeQuery({
      query: GetTags,
      data: { tags: query.tags },
    });
  }
}
