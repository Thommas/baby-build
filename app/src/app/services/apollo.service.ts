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
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { flatMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProgressService } from './progress.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ApolloService {
  /**
   * Constructor
   */
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private progressService: ProgressService,
    private authService: AuthService
  ) {
    const authLink = new ApolloLink((operation: any, forward: any): any => {
      return this.authService.token.pipe(flatMap((token: string) => {
        operation.setContext({
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        });
        return forward(operation);
      }));
    });
    apollo.create({
      link: concat(
        authLink,
        httpLink.create({ uri: environment.apollo.url }),
      ),
      cache: new InMemoryCache()
    });
  }
}
