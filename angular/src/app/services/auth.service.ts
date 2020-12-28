/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 *
 * @see https://auth0.com/docs/quickstart/spa/angular2/01-login
 * @see https://auth0.com/docs/quickstart/spa/angular2/05-token-renewal
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { BrowserService } from './browser.service';
import { environment } from '../../environments/environment';
import { AuthFacade } from '../facade/auth.facade';

@Injectable()
export class AuthService {
  private _lock: any;
  private checkSessionSubscriber: any;

  /**
   * Constructor
   */
  constructor(
    private router: Router,
    private browserService: BrowserService,
    private authFacade: AuthFacade
  ) {
    this._lock = null;
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
      return of(this._lock);
    }

    if (!this.browserService.document) {
      return of(null);
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
      console.log('authenticated', authResult);
      // this.setSession(authResult);
      // this.router.navigate(['']);
    });

    obs.next(this._lock);
    return obs;
  }

  /**
   * Store authentication results in local storage
   */
  setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());

    this.authFacade.loginSuccess(authResult.accessToken, authResult.idToken, expiresAt);
  }

  /**
   * Display login modal
   */
  login() {
    this.lock.subscribe(lock => {
      if (lock) {
        lock.hide();
        lock.show();
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
        });
      }
    });
  }

  /**
   * Purge local storage and redirect to home
   */
  logout() {
    this.authFacade.logoutSuccess();
    this.router.navigate(['/security/login']);
  }

  /**
   * Resume authentication process after redirect from auth0
   */
  resumeAuth(hash) {
    // this.lock.subscribe(lock => {
    //   if (lock) {
    //     lock.resumeAuth(hash, (error, authResult) => {
    //       if (error) {
    //         console.log('error', error);
    //       } else if (authResult && authResult.accessToken && authResult.idToken) {
    //         console.log('resumeAuth', authResult);
    //         this.setSession(authResult);
    //       }
    //     });
    //   }
    // });
  }

  /**
   * Return the current idToken
   */
  get idToken$(): Observable<string> {
    return this.authFacade.idToken$;
  }

  /**
   * Check whether the current time is past the access token's expiry time
   */
  get isAuthenticated$(): Observable<boolean> {
    return this.authFacade.expiresAt$.pipe(
      take(1),
      mergeMap((expiresAt: string) => {
        return of(true);
        // if (!expiresAt) {
        //   return of(false);
        // }
        // if (new Date().getTime() < parseInt(expiresAt, 10)) {
        //   return of(true);
        // }
        // return this.renewToken();
      })
    );
  }

  /**
   * Renew token
   */
  renewToken(): Observable<boolean> {
    return this.lock.pipe(mergeMap(lock => {
      if (!lock) {
        return of(false);
      }

      // FIXME Implement ngrx action/effect
      this.logout();

      return of(false);
    }));
  }

  /**
   * Check auth0 session
   */
  checkSession(lock: any) {
    // if (this.checkSessionSubscriber) {
    //   console.log('REUSE checkSessionSubscriber');
    //   return this.checkSessionSubscriber;
    // }
    // console.log('CREATE checkSessionSubscriber');
    // this.checkSessionSubscriber = Observable.create(obs => {
    //   console.log('checkSession');
    //   lock.checkSession({}, (err, result) => {
    //     if (err) {
    //       this.router.navigate(['/security/login']);
    //       obs.next(true);
    //       obs.complete();
    //       obs.error(`Could not get a new token (${err.error}: ${err.error_description}).`);
    //       console.log(`Could not get a new token (${err.error}: ${err.error_description}).`);
    //     } else {
    //       console.log(`Successfully renewed auth!`, result);
    //       this.setSession(result);
    //       obs.next(true);
    //       obs.complete();
    //     }
    //   });
    // });
    // return this.checkSessionSubscriber;
  }
}
