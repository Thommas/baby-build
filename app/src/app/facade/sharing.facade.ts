/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, mergeMap } from 'rxjs/operators';
import { GetSharings, CreateSharingMutation, DeleteSharingMutation } from '../graphql';
import { ApolloService } from '../services';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { CreateSharing, DeleteSharing, SharingActionTypes } from '../store';
import { Store } from '@ngrx/store';

@Injectable()
export class SharingFacade {
  sharings$: Observable<any>;

  constructor(
    private actions$: Actions,
    private apolloService: ApolloService,
    private store: Store<any>
  ) {
    this.sharings$ = this.apolloService.apolloClient.watchQuery<any>({
      query: GetSharings
    })
      .valueChanges
      .pipe(
        pluck('data', 'sharings')
      );
  }

  createSharing(userId: string) {
    this.store.dispatch(new CreateSharing({ userId }));
  }

  @Effect({dispatch: false})
  createSharing$ = this.actions$
    .pipe(
      ofType(SharingActionTypes.CreateSharing),
      mergeMap((action: any) => {
        return this.apolloService.apolloClient.mutate({
          mutation: CreateSharingMutation,
          variables: action.payload,
        });
      })
    );

  deleteSharing(sharingId: string) {
    this.store.dispatch(new DeleteSharing({ id: sharingId }));
  }

  @Effect({dispatch: false})
  deleteSharing$ = this.actions$
    .pipe(
      ofType(SharingActionTypes.DeleteSharing),
      mergeMap((action: any) => {
        return this.apolloService.apolloClient.mutate({
          mutation: DeleteSharingMutation,
          variables: action.payload,
          update: (store, { data: { deleteSharing } }) => {
            const query: any = store.readQuery({ query: GetSharings });
            const sharings: any[] = query.sharings.filter((sharing: any) => sharing.id !== deleteSharing.id);
            store.writeQuery({ query: GetSharings, data: { sharings }});
          }
        });
      })
    );
}
