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
import { Observable, of as observableOf, from, forkJoin } from 'rxjs';
import { map, flatMap, take } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';
import { BrowserService } from './browser.service';
import { DexieService } from './dexie.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  static LOCAL_STORAGE_ACCESS_TOKEN = 'access_token';
  static LOCAL_STORAGE_ID_TOKEN = 'id_token';
  static LOCAL_STORAGE_EXPIRES_AT = 'expires_at';

  private _lock: any;
  private refreshSubscription: any;
  private tokenObs: Observable<string>;
  private isAuthenticatedObs: Observable<boolean>;
  private renewTokenInnerSubscriber: any;

  /**
   * Constructor
   */
  constructor(
    private router: Router,
    private dexieService: DexieService,
    private browserService: BrowserService
  ) {
    this._lock = null;
    this.refreshSubscription = null;
    this.tokenObs = null;
    this.isAuthenticatedObs = null;
    this.renewTokenInnerSubscriber = null;
  }

  /**
   * Load auth0 lock dynamically to bypass SSR limitation on require crypto
   */
  init() {
    this.lock.subscribe(
      () => {},
      (e) => {}
    );
  }

  /**
   * Returns an instance of auth0 lock
   */
  get lock(): Observable<any> {
    if (this._lock) {
      return observableOf(this._lock);
    }

    if (!this.browserService.document) {
      return observableOf(null);
    }

    return Observable.create(obs => {
      const document = this.browserService.document;
      const scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.async = true;
      scriptElement.defer = true;
      scriptElement.onload = () => this.onAuth0LockLoaded(obs);
      scriptElement.src = 'https://cdn.auth0.com/js/lock/11.5.2/lock.min.js';
      document.body.appendChild(scriptElement);
    });
  }

  /**
   * Once auth0 lock is loaded in the browser, initialize it
   */
  onAuth0LockLoaded(obs: any) {
    if (this._lock) {
      obs.next(this._lock);
      return obs;
    }

    const Auth0Lock = this.browserService.window.Auth0Lock;
    this._lock = new Auth0Lock(
      environment.auth0.clientID,
      environment.auth0.domain,
      environment.auth0.options
    );
    this._lock.on('authenticated', (authResult: any) => {
      this.setSession(authResult).subscribe(() => {
        this.refreshIsAuthenticated();
      });
    });

    obs.next(this._lock);
    return obs;
  }

  /**
   * Store authentication results in local storage
   */
  setSession(authResult): Observable<any> {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());

    const obs = [
      this.dexieService.setItem(AuthService.LOCAL_STORAGE_ACCESS_TOKEN, authResult.accessToken),
      this.dexieService.setItem(AuthService.LOCAL_STORAGE_ID_TOKEN, authResult.idToken),
      this.dexieService.setItem(AuthService.LOCAL_STORAGE_EXPIRES_AT, expiresAt)
    ];
    return forkJoin(obs, () => {
      // Nothing
    });
  }

  /**
   * Refresh isAuthenticated and redirect to home
   */
  refreshIsAuthenticated() {
    this.isAuthenticatedObs = null;
    this.isAuthenticated.pipe(take(1)).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  /**
   * Display login modal
   */
  login() {
    this.lock.subscribe(lock => {
      if (lock) {
        lock.show()
      }
    });
  }

  /**
   * Display signUp modal
   */
  signUp() {
    this.lock.subscribe(lock => {
      if (lock) {
        lock.show({
          initialScreen: 'signUp'
        })
      }
    });
  }

  /**
   * Purge local storage and redirect to home
   */
  logout() {
    this.dexieService.clearKeyValueStoreTable().subscribe(
      () => this.refreshIsAuthenticated()
    );
  }

  /**
   * Resume authentication process after redirect from auth0
   */
  resumeAuth(hash) {
    this.lock.subscribe(lock => {
      if (lock) {
        lock.resumeAuth(hash, (error, authResult) => {
          if (error) {
            console.log('error', error);
          } else if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
          }
        });
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
        .pipe(flatMap((expiresAt: string) => {
          if (!expiresAt) {
            return observableOf(false);
          }
          if (new Date().getTime() < parseInt(expiresAt, 10)) {
            return observableOf(true);
          }
          return this.renewToken();
        }));
    }
    return this.isAuthenticatedObs;
  }

  /**
   * Renew token
   */
  renewToken(): Observable<boolean> {
    this.renewTokenInnerSubscriber = null;
    return this.lock.pipe(flatMap(lock => {
      if (!lock) {
        return observableOf(false);
      }
      return Observable.create(obs => {
        if (this.renewTokenInnerSubscriber) {
          return;
        }
        this.renewTokenInnerSubscriber = obs;
        lock.checkSession({}, (err, result) => {
          if (err) {
            this.router.navigate(['/security/login']);
            obs.error(`Could not get a new token (${err.error}: ${err.error_description}).`);
          } else {
            console.log(`Successfully renewed auth!`);
            obs.next(true);
            obs.complete();
            this.setSession(result).subscribe();
          }
        });
      });
    }));
  }
}
