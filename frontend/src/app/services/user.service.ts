/**
 * Path of child
 *
 * Service - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetAuthUser } from '../graphql';

@Injectable()
export class UserService {
  user: any;

  constructor(private apollo: Apollo) {
    this.loadUser();
  }

  loadUser() {
    this.apollo.watchQuery<any>({
      query: GetAuthUser
    })
      .valueChanges
      .subscribe(({ data }) => {
        if (data && data.authUser) {
          this.user = data.authUser;
        } else {
          this.user = {
            id: null,
            gamification: {
              xp: 0,
              level: 1
            }
          }
        }
      });
  }
}
