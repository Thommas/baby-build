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
  public setBuild(build) {
    localStorage.setItem('pathofexile_selected_build', JSON.stringify(build));
  }

  public get isBuild() {
    return localStorage.getItem('pathofexile_selected_build') ? true : false;
  }

  public get build() {
    const buildInStorage = localStorage.getItem('pathofexile_selected_build');
    return JSON.parse(buildInStorage);
  }
}
