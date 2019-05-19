/**
 * Path of child
 *
 * Service - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable, of as observableOf } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { GetAuthUser, UpdateUserMutation } from '../graphql';

@Injectable()
export class UserService {
  private userObs: any;

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router
  ) {
    this.userObs = null;
  }

  get user$() {
    if (!this.userObs) {
      this.userObs = this.authService.isAuthenticated.pipe(flatMap(isAuthenticated => {
        if (!isAuthenticated) {
          return observableOf(null);
        }
        return this.apollo.watchQuery<any>({
          query: GetAuthUser
        })
          .valueChanges
          .pipe(
            map((res: any) => res.data.authUser),
          );
      }));
    }
    return this.userObs;
  }

  init() {
    this.user$.subscribe((response) => {
      if (response && response.data) {
        const authUser = response.data.authUser;
        this.router.navigate([``]);
      }
    });
  }

  setCurrentBuildId(buildId: string) {
    this.user$.pipe(flatMap((response: any) => {
      if (response && response.data) {
        const authUser = response.data.authUser;
        return this.apollo.mutate({
          mutation: UpdateUserMutation,
          variables: {
            id: authUser.id,
            currentBuildId: buildId
          }
        })
      }
    })).subscribe();
  }
}
