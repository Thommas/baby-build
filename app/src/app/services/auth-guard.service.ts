/**
 * Path of child
 *
 * authorization
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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
    return this.authService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          return this.authenticationFailed(route);
        }
        return true;
      }),
      catchError(e => {
        return observableOf(this.authenticationFailed(route));
      })
    );
  }

  /**
   * If user is on the home screen, bypass auth guard
   */
  authenticationFailed(route: ActivatedRouteSnapshot): boolean {
    this.router.navigate(['/security/login']);
    return false;
  }
}
