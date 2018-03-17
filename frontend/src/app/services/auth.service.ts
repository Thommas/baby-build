/**
 * Path of child
 *
 * Service - Auth
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 *
 * @see https://auth0.com/docs/quickstart/spa/angular2/01-login
 * @see https://auth0.com/docs/quickstart/spa/angular2/05-token-renewal
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/throw';
import Auth0Lock from 'auth0-lock';
import * as jwt from 'jsonwebtoken';
import { DexieService } from './dexie.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  static LOCAL_STORAGE_ACCESS_TOKEN = 'access_token';
  static LOCAL_STORAGE_ID_TOKEN = 'id_token';
  static LOCAL_STORAGE_EXPIRES_AT = 'expires_at';

  lock: any;
  refreshSubscription: any;
  private isAuthenticatedObs: Observable<boolean>;

  /**
   * Constructor
   */
  constructor(private router: Router, private dexieService: DexieService) {
    this.isAuthenticatedObs = null;
    this.lock = new Auth0Lock(
      environment.auth0.clientID,
      environment.auth0.domain,
      environment.auth0.options
    );
    this.lock.on('authenticated', (authResult: any) => {
      this.setSession(authResult);
    });
  }

  /**
   * Store authentication results in local storage
   */
  setSession(authResult) {
    console.log('authResult', authResult)
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());

    this.dexieService.setItem(AuthService.LOCAL_STORAGE_ACCESS_TOKEN, authResult.accessToken);
    this.dexieService.setItem(AuthService.LOCAL_STORAGE_ID_TOKEN, authResult.idToken);
    this.dexieService.setItem(AuthService.LOCAL_STORAGE_EXPIRES_AT, expiresAt);

    this.scheduleRenewal();
  }

  /**
   * Display login modal
   */
  login() {
    this.lock.show();
  }

  /**
   * Display signUp modal
   */
  signUp() {
    this.lock.show({
      initialScreen: 'signUp'
    });
  }

  /**
   * Purge local storage and redirect to home
   */
  logout() {
    this.dexieService.clearKeyValueStoreTable();
    this.unscheduleRenewal();
    this.router.navigate(['/']);
  }

  /**
   * Resume authentication process after redirect from auth0
   */
  resumeAuth(hash) {
    this.lock.resumeAuth(hash, (error, authResult) => {
      if (error) {
        console.log('error', error)
      } else if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      }
    });
  }

  /**
   * Check whether the current time is past the access token's expiry time
   */
  get isAuthenticated(): Observable<boolean> {
    if (!this.isAuthenticatedObs) {
      this.isAuthenticatedObs = this.dexieService.getItem(AuthService.LOCAL_STORAGE_EXPIRES_AT)
        .map((expiresAt: string) => {
          return expiresAt && new Date().getTime() < parseInt(expiresAt);
        });
    }
    return this.isAuthenticatedObs;
  }

  /**
   * Renew token
   */
  renewToken() {
    this.lock.checkSession({}, (err, result) => {
      if (err) {
        console.log(`Could not get a new token (${err.error}: ${err.error_description}).`);
      } else {
        console.log(`Successfully renewed auth!`);
        this.setSession(result);
      }
    });
  }

  /**
   * Schedule token renewal
   */
  scheduleRenewal(): void {
    this.isAuthenticated.map(isAuthenticated => {
      if (!isAuthenticated) {
        return;
      }
      this.unscheduleRenewal();

      const obs = this.dexieService.getItem(AuthService.LOCAL_STORAGE_EXPIRES_AT);
      obs.map((expiresAt: string) => {
        const source = Observable.timer(Math.max(1, parseInt(expiresAt) - Date.now()));
        this.refreshSubscription = source.subscribe(() => {
          this.renewToken();
          console.log('schedule renewal');
          // this.scheduleRenewal();
        });
      })
    })
  }

  /**
   * Unschedule token renewal
   */
  unscheduleRenewal() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
