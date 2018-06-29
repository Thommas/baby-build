/**
 * Path of child
 *
 * Service - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { find } from 'lodash'
import { Injectable } from '@angular/core';

@Injectable()
export class BuildService {
  eras: any = [
    {
      index: 0,
      id: 'baby',
      label: 'calendar.list.baby',
      childYears: [1, 2, 3, 4, 5]
    },
    {
      index: 1,
      id: 'young-child',
      label: 'calendar.list.young_child',
      childYears: [6, 7, 8, 9, 10]
    },
    {
      index: 2,
      id: 'child',
      label: 'calendar.list.child',
      childYears: [11, 12, 13, 14, 15]
    },
    {
      index: 3,
      id: 'teenager',
      label: 'calendar.list.teenager',
      childYears: [16, 17, 18, 19, 20]
    },
    {
      index: 4,
      id: 'young-adult',
      label: 'calendar.list.young_adult',
      childYears: [21, 22, 23, 24, 25]
    }
  ];

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

  public get era(): any {
    const era = find(this.eras, (era) => {
      return era.childYears.indexOf(this.childYear) !== -1;
    });
    if (era) {
      return era.id;
    }
    return null;
  }
}
