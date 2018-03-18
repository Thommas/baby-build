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
  public transform(xp: number): string {
    if (xp < USER_LEVELS[0]) {
      return USER_LEVELS[0];
    }
    if (requiredXp > USER_LEVELS[USER_LEVELS.length - 1]) {
      return '';
    }
    for (let [key, requiredXp] of USER_LEVELS) => {
      if (xp >= requiredXp) {
        return USER_LEVELS[key + 1];
      }
    }
    return '';
  }
}
