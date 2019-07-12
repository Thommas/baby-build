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
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { first } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ApolloService {
  private _apolloClient: Apollo;

  /**
   * Constructor
   */
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private authService: AuthService
  ) {
  }

  /**
   * Returns a valid apollo client
   */
  get apolloClient(): Apollo {
    if (this._apolloClient) {
      return this._apolloClient;
    }

    const authLink = setContext(async(_, { headers }) => {
      let token = await this.authService.idToken$.pipe(first()).toPromise();
      console.log('token', token);

      return {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      };
    });

    const errorLink: ApolloLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );

      if (networkError) console.log(`[Network error]: ${networkError}`);
    });
    const httpLink: ApolloLink = this.httpLink.create({ uri: environment.apollo.url });
    this.apollo.create({
      link: ApolloLink.from([authLink, errorLink, httpLink]),
      cache: new InMemoryCache()
    });
    this._apolloClient = this.apollo;
    return this._apolloClient;
  }
}
