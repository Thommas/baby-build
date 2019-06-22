/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { flatMap, pluck } from 'rxjs/operators';
import { GetAuthUser } from '../graphql';
import { AuthService } from '../services';

@Injectable()
export class UserFacade {
  user$: Observable<any>;

  constructor(private apollo: Apollo, private authService: AuthService) {
    this.user$ = this.authService.isAuthenticated.pipe(
      flatMap(isAuthenticated => {
        console.log('isAuthenticated', isAuthenticated);
        if (!isAuthenticated) {
          return of(null);
        }
        return this.apollo.watchQuery<any>({
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
