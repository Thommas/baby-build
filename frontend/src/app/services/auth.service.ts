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
import * as jwt from 'jsonwebtoken';
import { BrowserService } from './browser.service';
import { DexieService } from './dexie.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  static LOCAL_STORAGE_ACCESS_TOKEN = 'access_token';
  static LOCAL_STORAGE_ID_TOKEN = 'id_token';
  static LOCAL_STORAGE_EXPIRES_AT = 'expires_at';

  lock: any;
  refreshSubscription: any;
  private tokenObs: Observable<string>;
  private isAuthenticatedObs: Observable<boolean>;

  /**
   * Constructor
   */
  constructor(
    private router: Router,
    private dexieService: DexieService,
    private browserService: BrowserService
  ) {
    this.lock = null;
    this.refreshSubscription = null;
    this.tokenObs = null;
    this.isAuthenticatedObs = null;
  }

  /**
   * Load auth0 lock dynamically to bypass SSR limitation on require crypto
   */
  init() {
    if (!this.browserService.document) {
      return;
    }

    const document = this.browserService.document;
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.async = true;
    scriptElement.defer = true;
    scriptElement.onload = () => this.onAuth0LockLoaded();
    scriptElement.src = 'https://cdn.auth0.com/js/lock/11.5.2/lock.min.js';
    document.body.appendChild(scriptElement);
  }

  /**
   * Once auth0 lock is loaded in the browser, initialize it
   */
  onAuth0LockLoaded() {
    const Auth0Lock = this.browserService.window.Auth0Lock;
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
    console.log('authResult', authResult);
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());

    const obs = [
      this.dexieService.setItem(AuthService.LOCAL_STORAGE_ACCESS_TOKEN, authResult.accessToken),
      this.dexieService.setItem(AuthService.LOCAL_STORAGE_ID_TOKEN, authResult.idToken),
      this.dexieService.setItem(AuthService.LOCAL_STORAGE_EXPIRES_AT, expiresAt)
    ];
    return Observable.forkJoin(obs, () => {
      // Nothing
    }).subscribe(() => {
      this.scheduleRenewal();
      this.refreshIsAuthenticated();
    });
  }

  /**
   * Refresh isAuthenticated and redirect to home
   */
  refreshIsAuthenticated() {
    this.isAuthenticatedObs = null;
    this.isAuthenticated.take(1).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  /**
   * Display login modal
   */
  login() {
    if (!this.lock) {
      return;
    }
    this.lock.show();
  }

  /**
   * Display signUp modal
   */
  signUp() {
    if (!this.lock) {
      return;
    }
    this.lock.show({
      initialScreen: 'signUp'
    });
  }

  /**
   * Purge local storage and redirect to home
   */
  logout() {
    this.unscheduleRenewal();
    this.dexieService.clearKeyValueStoreTable().subscribe(
      () => this.refreshIsAuthenticated()
    );
  }

  /**
   * Resume authentication process after redirect from auth0
   */
  resumeAuth(hash) {
    if (!this.lock) {
      return;
    }
    this.lock.resumeAuth(hash, (error, authResult) => {
      if (error) {
        console.log('error', error);
      } else if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      }
    });
  }

  /**
   * Return the current idToken
   */
  get token(): Observable<string> {
    if (!this.tokenObs) {
      this.tokenObs = this.dexieService.getItem(AuthService.LOCAL_STORAGE_ID_TOKEN);
    }
    return this.tokenObs;
  }

  /**
   * Check whether the current time is past the access token's expiry time
   */
  get isAuthenticated(): Observable<boolean> {
    if (!this.isAuthenticatedObs) {
      this.isAuthenticatedObs = this.dexieService.getItem(AuthService.LOCAL_STORAGE_EXPIRES_AT)
        .map((expiresAt: string) => {
          return expiresAt && new Date().getTime() < parseInt(expiresAt, 10);
        });
    }
    return this.isAuthenticatedObs;
  }

  /**
   * Renew token
   */
  renewToken() {
    if (!this.lock) {
      return;
    }
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
        const source = Observable.timer(Math.max(1, parseInt(expiresAt, 10) - Date.now()));
        this.refreshSubscription = source.subscribe(() => {
          this.renewToken();
        });
      });
    });
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
