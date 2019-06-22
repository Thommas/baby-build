/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { GetTags } from '../graphql';

@Injectable()
export class TagFacade {
  tags$: Observable<any>;

  constructor(private apollo: Apollo) {
    this.tags$ = this.apollo.watchQuery<any>({
      query: GetTags,
    })
      .valueChanges
      .pipe(
        pluck('data', 'tags')
      );
  }
}
