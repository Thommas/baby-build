/**
 * Path of child
 *
 * Service - Dexie
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import Dexie from 'dexie';
import { environment } from '../../environments/environment';

@Injectable()
export class DexieService {
  db: any;
  keyValuePairsTable: any;

  /**
   * Constructor
   */
  constructor() {
    this.db = new Dexie(environment.dexieDatabase);
  	this.db.version(1).stores({
  		keyvaluepairs: 'key, value, [key+value]'
  	});
    this.keyValuePairsTable = this.db.keyvaluepairs;
  }

  /**
   * Get item
   */
  getItem(key: string): Observable<any> {
    return Observable.fromPromise(this.keyValuePairsTable.get(key)).map(item => item.value);
  }

  /**
   * Set item
   */
  setItem(key: string, value: string): Observable<any> {
    return Observable.fromPromise(this.keyValuePairsTable.put({ key, value }));
  }

  /**
   * Clear all items from the keyValueStore table
   */
  clearKeyValueStoreTable(): Observable<any> {
    return Observable.fromPromise(this.keyValuePairsTable.clear());
  }
}
