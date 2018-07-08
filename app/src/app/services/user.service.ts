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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
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

  get user() {
    if (!this.userObs) {
      this.userObs = this.authService.isAuthenticated.mergeMap(isAuthenticated => {
        if (!isAuthenticated) {
          return Observable.of(null);
        }
        return this.apollo.watchQuery<any>({
          query: GetAuthUser
        }).valueChanges;
      });
    }
    return this.userObs;
  }

  init() {
    this.user.subscribe((response) => {
      const authUser = response.data.authUser;
      if (authUser.current_build_id) {
        this.router.navigate([`${authUser.current_build_id}/task`]);
      } else {
        this.router.navigate([`build/create`]);
      }
    });
  }

  setCurrentBuildId(buildId: string) {
    this.user.mergeMap((response) => {
      const authUser = response.data.authUser;
      return this.apollo.mutate({
        mutation: UpdateUserMutation,
        variables: {
          id: authUser.id,
          current_build_id: buildId
        }
      })
    }).subscribe();
  }
}
