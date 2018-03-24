/**
 * Path of child
 *
 * Service - Http
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProgressService } from './progress.service';
import { forEach } from 'lodash';

@Injectable()
export class HttpService {
  constructor(
    protected http: Http,
    protected progressService: ProgressService
  ) {}

  /**
   * POST
   */
  post(url: string, body: any): Observable<any> {
    return this.progressService.trackObservable(
      this.http.post(url, body, this.buildRequestOptions(body))
    );
  }

  /**
   * Builds request options
   */
  protected buildRequestOptions(body?: any, params?: any) {
    return this.buildOptions(body, this.buildQueryParams(params));
  }

  /**
   * Builds options
   */
  protected buildOptions(body?: any, urlSearchParams?: URLSearchParams) {
    if (!body) {
      body = '';
    }
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return new RequestOptions({
      body: body,
      headers: headers,
      search: urlSearchParams
    });
  }

  /**
   * Builds URLSearchParams from query parameters array
   */
  protected buildQueryParams(params?: any) {
    if (!params) {
      return null;
    }
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    forEach(params, (value, key) => {
      urlSearchParams.set(key, value);
    });
    return urlSearchParams;
  }
}
