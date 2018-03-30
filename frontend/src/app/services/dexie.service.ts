/**
 * Path of child
 *
 * Service - Dexie
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import Dexie from 'dexie';
import { environment } from '../../environments/environment';

@Injectable()
export class DexieService {
  db: any;
  keyValuePairsTable: any;

  /**
   * Constructor
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.db = null;
    if (isPlatformBrowser(platformId)) {
      this.db = new Dexie(environment.dexieDatabase);
      const schema = {
        keyvaluepairs: 'key, value, [key+value]'
      };
      this.db.version(1).stores(schema);
      this.keyValuePairsTable = this.db.keyvaluepairs;
    }
  }

  /**
   * Get item
   */
  getItem(key: string): Observable<any> {
    if (this.db) {
      return Observable.fromPromise(this.keyValuePairsTable.get(key))
        .map((item: any) => item ? item.value : null);
    }
    return Observable.of(false);
  }

  /**
   * Set item
   */
  setItem(key: string, value: string): Observable<any> {
    if (this.db) {
      return Observable.fromPromise(this.keyValuePairsTable.put({ key, value }));
    }
    return Observable.of(false);
  }

  /**
   * Clear all items from the keyValueStore table
   */
  clearKeyValueStoreTable(): Observable<any> {
    if (this.db) {
      return Observable.fromPromise(this.keyValuePairsTable.clear());
    }
    return Observable.of(false);
  }
}
