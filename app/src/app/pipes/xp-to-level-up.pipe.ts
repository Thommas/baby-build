/**
 * Path of child
 *
 * Pipe - Xp to level up
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Pipe, PipeTransform } from '@angular/core';
import { USER_LEVELS } from '../constants/gamification';

@Pipe({
  name: 'xpToLevelUp',
  pure: false
})
export class XpToLevelUpPipe implements PipeTransform {
  public transform(xp: number): any {
    if (xp < USER_LEVELS[0]) {
      return USER_LEVELS[0];
    }
    if (xp >= USER_LEVELS[USER_LEVELS.length - 1]) {
      return '';
    }
    for (let i = USER_LEVELS.length - 2; i >= 0; i--) {
      if (xp >= USER_LEVELS[i]) {
        return USER_LEVELS[i + 1];
      }
    }
    return '';
  }
}
