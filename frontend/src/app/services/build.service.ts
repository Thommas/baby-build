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

  public setChildYear(childYear: number) {
    localStorage.setItem('path_of_child_selected_child_year', childYear.toString());
  }

  public get childYear(): number {
    const childYear = localStorage.getItem('path_of_child_selected_child_year');
    if (childYear) {
      return parseInt(childYear, 10);
    }
    return null;
  }
}
