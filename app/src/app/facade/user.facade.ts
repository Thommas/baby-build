/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap, pluck, take, withLatestFrom, mergeMap } from 'rxjs/operators';
import { GetAuthUser, UpdateUserMutation, GetUsers } from '../graphql';
import { ApolloService, AuthService } from '../services';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { UpdateUser, UserActionTypes } from '../store';
import { Store } from '@ngrx/store';

@Injectable()
export class UserFacade {
  user$: Observable<any>;

  constructor(
    private actions$: Actions,
    private apolloService: ApolloService,
    private authService: AuthService,
    private store: Store<any>
  ) {
    this.user$ = this.authService.isAuthenticated$.pipe(
      take(1),
      flatMap(isAuthenticated => {
        if (!isAuthenticated) {
          return of(null);
        }
        return this.apolloService.apolloClient.watchQuery<any>({
          query: GetAuthUser
        })
          .valueChanges
          .pipe(
            pluck('data', 'authUser')
          );
      })
    );
  }

  getUsersBySearchQuery(searchQuery: string) {
    return this.apolloService.apolloClient.watchQuery<any>({
      query: GetUsers,
      variables: {
        searchQuery,
      },
    }).valueChanges;
  }

  updateUser(data: any) {
    this.store.dispatch(new UpdateUser(data));
  }

  @Effect({dispatch: false})
  updateIdea$ = this.actions$
    .pipe(
      ofType(UserActionTypes.UpdateUser),
      mergeMap((action: any) => {
        const user: any = action.payload;
        return this.apolloService.apolloClient.mutate({
          mutation: UpdateUserMutation,
          variables: user,
          optimisticResponse: {
            __typename: 'Mutation',
            optimistic: true,
            updateUser: {
              __typename: 'User',
              ...user
            },
          },
          update: (store, { data: { updateUser } }) => {
            console.log('updateUser', updateUser);
          }
        });
      })
    );
}
