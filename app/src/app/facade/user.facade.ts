/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { flatMap, pluck, take } from 'rxjs/operators';
import { GetAuthUser } from '../graphql';
import { ApolloService, AuthService } from '../services';

@Injectable()
export class UserFacade {
  user$: Observable<any>;

  constructor(
    private apolloService: ApolloService,
    private authService: AuthService
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
}
