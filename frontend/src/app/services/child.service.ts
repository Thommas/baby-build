/**
 * Path of child
 *
 * Service - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { BuildService } from './build.service';

@Injectable()
export class ChildService {
  constructor(private buildService: BuildService) {}

  public setChild(child) {
    this.buildService.setBuild(null);
    localStorage.setItem('pathofexile_selected_child', JSON.stringify(child));
  }

  public get child() {
    const childInStorage = localStorage.getItem('pathofexile_selected_child');
    return JSON.parse(childInStorage);
  }
}
