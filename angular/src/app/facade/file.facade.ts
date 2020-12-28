/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import {
  GetFiles,
} from '../graphql';
import { ApolloService } from '../services';
import { FileActionTypes, SetFile } from '../store/file/file.actions';

@Injectable()
export class FileFacade {
  filters$: Observable<any> = this.store.pipe(select('file'));

  constructor(
    private actions$: Actions,
    private apolloService: ApolloService,
    private store: Store<{ idea: any }>
  ) {
  }

  setFileInput(input: any) {
    this.store.dispatch(new SetFile({
      input
    }));
  }

  @Effect({dispatch: false})
  files$ = this.actions$
    .pipe(
      ofType(FileActionTypes.SetFile),
      mergeMap((action: any) => {
        console.log('action', action);
        return this.apolloService.apolloClient.watchQuery<any>({
          query: GetFiles,
          variables: {
            fileInput: {
              input: action.payload.input
            },
          },
        })
        .valueChanges
        .pipe(
          map((response: any) => {
            console.log('response', response);
            return response.data.files;
          }),
        );
      }),
    );
}
