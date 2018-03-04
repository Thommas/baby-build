/**
 * Path of child
 *
 * Service - Apollo
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../../environments/environment';

@Injectable()
export class ApolloService {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    apollo.create({
      link: this.auth.concat(this.http),
      cache: new InMemoryCache()
    });
  }

  get http() {
    const http = this.httpLink.create({ uri: environment.apollo.url });

    return http;
  }

  get auth() {
    const auth = setContext((_, { headers }) => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return {};
      } else {
        return {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })
        };
      }
    });

    return auth;
  }
}
