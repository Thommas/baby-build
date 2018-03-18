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
    this.sub = null;
    authService.isAuthenticated.subscribe(
      (isAuthenticated) => this.setupWatchQuery(isAuthenticated)
    );
  }

  setupWatchQuery(isAuthenticated) {
    if (isAuthenticated && !this.sub) {
      console.log('SUB AUTH USER');
      this.sub = this.watchAuthUser();
    } else if (this.sub) {
      console.log('UNSUB AUTH USER');
      this.sub.unsubscribe();
    }
  }

  watchAuthUser() {
    return this.apollo.watchQuery<any>({
      query: GetAuthUser,
      options: { pollInterval: 5000 }
    })
      .valueChanges
      .subscribe(({ data }) => {
        console.log('GET AUTH USER', data);
        if (data && data.authUser) {
          this.user = data.authUser;
        } else {
          this.user = {
            id: null,
            gamification: {
              xp: 0,
              lvl: 1
            }
          };
        }
      });
  }
}
