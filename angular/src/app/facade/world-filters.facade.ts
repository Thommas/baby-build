/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  ResetWorldFilters,
  UpdateWorldFilters
} from '../store';

@Injectable()
export class WorldFiltersFacade {
  filters$: Observable<any> = this.store.pipe(select('worldFilters'));

  constructor(private store: Store<{ worldFilters: any }>) {}

  selectLabel(label: string) {
    this.store.dispatch(new UpdateWorldFilters({
      label,
    }));
  }

  reset() {
    this.store.dispatch(new ResetWorldFilters());
  }
}
