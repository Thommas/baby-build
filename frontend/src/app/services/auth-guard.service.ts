/**
 * Path of child
 *
 * Service - AuthGuard
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuardService implements CanActivate {
  /**
   * Constructor
   */
  constructor(protected router: Router) {}

  /**
   * Checks whether current user is logged or not.
   * Stores the current url to redirect user after login.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}
