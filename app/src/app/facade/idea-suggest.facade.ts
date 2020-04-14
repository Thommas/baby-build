/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  SetIdeaSuggest,
  ResetIdeaSuggest,
} from '../store';

@Injectable()
export class IdeaSuggestFacade {
  suggest$: Observable<any> = this.store.pipe(select('ideaSuggest'));

  constructor(private store: Store<{ ideaSuggest: any }>) {}

  setName(name: string) {
    this.store.dispatch(new SetIdeaSuggest({
      name,
    }));
  }

  reset() {
    this.store.dispatch(new ResetIdeaSuggest());
  }
}
