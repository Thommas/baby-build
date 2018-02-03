/**
 * Path of child
 *
 * Service - AuthGuard
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */
/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService
      ]
    });
  });

  it('#canActivate should return true', () => {
    const service = TestBed.get(AuthGuardService);
    // FIXME Find a way to mock ActivatedRouteSnapshot
  });
});
