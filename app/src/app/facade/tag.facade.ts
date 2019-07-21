/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { GetTags } from '../graphql';
import { ApolloService } from '../services';

@Injectable()
export class TagFacade {
  tags$: Observable<any> = this.apolloService.apolloClient.watchQuery<any>({
    query: GetTags,
  })
    .valueChanges
    .pipe(
      pluck('data', 'tags')
    );

  constructor(private apolloService: ApolloService) {}

  getTagsByLabel(label: string) {
    return this.apolloService.apolloClient.watchQuery<any>({
      query: GetTags,
      variables: {
        label,
      },
    })
      .valueChanges
      .pipe(
        pluck('data', 'tags')
      );
  }
}
