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
  public setChild(child) {
    localStorage.setItem('pathofexile_selected_child', JSON.stringify(child));
  }

  public get isChild() {
    return localStorage.getItem('pathofexile_selected_child') ? true : false;
  }

  public get child() {
    const childInStorage = localStorage.getItem('pathofexile_selected_child');
    return JSON.parse(childInStorage);
  }
}
