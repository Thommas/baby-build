/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  SetCharacterSuggest,
  ResetCharacterSuggest,
} from '../store';

@Injectable()
export class CharacterSuggestFacade {
  suggest$: Observable<any> = this.store.pipe(select('characterSuggest'));

  constructor(private store: Store<{ characterSuggest: any }>) {}

  set(suggest: any) {
    this.store.dispatch(new SetCharacterSuggest(suggest));
  }

  reset() {
    this.store.dispatch(new ResetCharacterSuggest());
  }
}
