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
    localStorage.setItem('path_of_child_selected_build', JSON.stringify(build));
  }

  public get build() {
    const buildInStorage = localStorage.getItem('path_of_child_selected_build');
    return JSON.parse(buildInStorage);
  }

  public setYear(year: number) {
    localStorage.setItem('path_of_child_selected_year', year.toString());
  }

  public get year(): number {
    const year = localStorage.getItem('path_of_child_selected_year');
    if (year) {
      return parseInt(year, 10);
    }
    return null;
  }
}
