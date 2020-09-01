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

  set(suggest: any) {
    this.store.dispatch(new SetIdeaSuggest(suggest));
  }

  reset() {
    this.store.dispatch(new ResetIdeaSuggest());
  }
}
