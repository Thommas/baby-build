/**
 * Path of child
 *
 * Pipe - Xp to level up
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { XpToLevelUpPipe } from './xp-to-level-up.pipe';

describe('XpToLevelUpPipe', () => {
  const pipe = new XpToLevelUpPipe();

  it('should returns xp to next level up', () => {
    expect(pipe.transform(0)).toEqual(525);
    expect(pipe.transform(524)).toEqual(525);
    expect(pipe.transform(525)).toEqual(1235);
    expect(pipe.transform(526)).toEqual(1235);
    expect(pipe.transform(1234)).toEqual(1235);
    expect(pipe.transform(1235)).toEqual(2021);
    expect(pipe.transform(1236)).toEqual(2021);
    expect(pipe.transform(294631835)).toEqual(294631836);
    expect(pipe.transform(294631836)).toEqual('');
    expect(pipe.transform(294631837)).toEqual('');
  });
});
