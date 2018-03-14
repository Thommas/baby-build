/**
 * Path of child
 *
 * Service - Auth
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import Auth0Lock from 'auth0-lock';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  lock: any;

  constructor(public router: Router) {
    this.lock = new Auth0Lock(
      environment.auth0.clientID,
      environment.auth0.domain,
      environment.auth0.options
    );
    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('accessToken', authResult.idToken);
    });
  }

  public login() {
    this.lock.show();
  }

  public signUp() {
    this.lock.show({
      initialScreen: 'signUp'
    });
  }

  public isAuthenticated() {
    return localStorage.getItem('accessToken') ? true : false;
  }

  public logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }

  public resumeAuth(hash) {
    this.lock.resumeAuth(hash, (error, authResult) => {
      if (error) {
        console.log('error', error)
      }
    });
  }
}
