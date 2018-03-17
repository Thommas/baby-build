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
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { AuthService } from './auth.service';
import { ProgressService } from './progress.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ApolloService {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private progressService: ProgressService,
    private authService: AuthService
  ) {
    apollo.create({
      link: this.middlewareLinkInstance.concat(this.httpLinkInstance),
      cache: new InMemoryCache()
    });
  }

  get httpLinkInstance() {
    return this.httpLink.create({ uri: environment.apollo.url });
  }

  get middlewareLinkInstance() {
    const token = 'FIXME';
    return new ApolloLink((operation, forward) => {
      console.log('operation', operation)
      console.log('forward', forward)
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      return forward(operation);
    })
  }
}
