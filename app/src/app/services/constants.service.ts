/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { IDEA_SORTS } from '../constants/idea-sorts';
import { CATEGORIES } from '../constants/categories';
import { PLATFORMS } from '../constants/platforms';
import { LANGUAGES } from '../constants/languages';

@Injectable()
export class ConstantsService {
  categories: any = CATEGORIES;
  platforms: any = PLATFORMS;
  languages: any = LANGUAGES;
  ideaSorts: any = IDEA_SORTS;

  getLabelByValue(value: string, items: any) {
    for (const item of items) {
      if (item.value === value) {
        return item.label;
      }
    }

    return '';
  }

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

  getLanguageIconByValue(value: string) {
    return this.getIconByValue(value, this.languages);
  }

  getScoreIcon(score: number) {
    if (score === 1) {
      return '/assets/img/tier/tier-d.png';
    }
    if (score === 2) {
      return '/assets/img/tier/tier-c.png';
    }
    if (score === 3) {
      return '/assets/img/tier/tier-b.png';
    }
    if (score === 4) {
      return '/assets/img/tier/tier-a.png';
    }
    if (score === 5) {
      return '/assets/img/tier/tier-s.png';
    }
    if (score === 6) {
      return '/assets/img/tier/tier-ss.png';
    }
    if (score === 7) {
      return '/assets/img/tier/tier-sss.png';
    }
    return '/assets/img/unknown.svg';
  }
}
