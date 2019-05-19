/**
 * Path of child
 *
 * Service - Http
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forEach } from 'lodash';

@Injectable()
export class HttpService {
  constructor(
    protected httpClient: HttpClient
  ) {}

  /**
   * POST
   */
  post(url: string, body: any): Observable<any> {
    return this.httpClient.post(url, body);
  }
}
