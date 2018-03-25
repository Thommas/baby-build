/**
 * Path of child
 *
 * Service - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthService } from './auth.service';
import { GetAuthUser } from '../graphql';

@Injectable()
export class UserService {
  user: any;
  sub: any;

  constructor(private apollo: Apollo, private authService: AuthService) {
    this.user = null;
    this.sub = null;
    authService.isAuthenticated.subscribe(
      (isAuthenticated) => this.setupWatchQuery(isAuthenticated)
    );
  }

  setupWatchQuery(isAuthenticated) {
    if (isAuthenticated && !this.sub) {
      this.sub = this.watchAuthUser();
    } else if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  watchAuthUser() {
    return this.apollo.watchQuery<any>({
      query: GetAuthUser
    })
      .valueChanges
      .subscribe(({ data }) => {
        if (data && data.authUser) {
          this.user = data.authUser;
        }
      });
  }
}
