/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { CATEGORIES } from '../constants/categories';
import { PLATFORMS } from '../constants/platforms';

@Injectable()
export class ConstantsService {
  categories: any = CATEGORIES;
  platforms: any = PLATFORMS;

  getIconByValue(value: string, items: any) {
    for (const item of items) {
      if (item.value === value) {
        return item.icon;
      }
    }

    return '';
  }

  getCategoryIconByValue(value: string) {
    return this.getIconByValue(value, this.categories);
  }

  getPlatformIconByValue(value: string) {
    return this.getIconByValue(value, this.platforms);
  }
}
