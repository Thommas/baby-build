/**
 * Path of child
 *
 * Service - AuthGuard
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 *
 * @see https://auth0.com/docs/quickstart/spa/angular2/04-authorization
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  /**
   * Constructor
   */
  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Checks whether current user is logged or not.
   * Stores the current url to redirect user after login.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated.map(
      isAuthenticated => {
        if (!isAuthenticated) {
          return this.authenticationFailed(route);
        }
        return true;
      }
    ).catch(e => {
      return Observable.of(this.authenticationFailed(route));
    });
  }

  /**
   * If user is on the home screen, bypass auth guard
   */
  authenticationFailed(route: ActivatedRouteSnapshot): boolean {
    this.router.navigate(['/security/login']);
    return false;
  }
}
