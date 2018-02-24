/**
 * Path of child
 *
 * Service - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';

@Injectable()
export class ChildService {
  child: any;

  constructor() {
    this.child = null;
  }

  public selectChild(child) {
    this.child = child;
  };
}
