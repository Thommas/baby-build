/**
 * Path of child
 *
 * Service - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';

@Injectable()
export class BuildService {
  build: any;

  constructor() {
    this.build = null;
  }

  public selectBuild(build) {
    this.build = build;
  };
}
