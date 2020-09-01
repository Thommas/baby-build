/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgressService } from './progress.service';
import { forEach } from 'lodash';

@Injectable()
export class HttpService {
  constructor(
    protected httpClient: HttpClient,
    protected progressService: ProgressService
  ) {}

  /**
   * POST
   */
  post(url: string, body: any): Observable<any> {
    return this.progressService.trackObservable(
      this.httpClient.post(url, body)
    );
  }
}
