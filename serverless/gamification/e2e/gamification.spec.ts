/**
 * Path of child
 *
 * Gamification - Dynamo - Gamification
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

require('dotenv').config();
import { addXp } from '../lib/dynamo/gamification'

describe('Gamification', () => {
  const now = new Date().getTime();

  it('addXp - Create then update', (done) => {
    addXp('build', now, 42).then((data) => {
      expect(data).toEqual({ id: 'build-' + now, xp: 42, lvl: 1 });
      addXp('build', now, 600).then((data) => {
        expect(data).toEqual({ xp: 642, lvl: 2 });
        done();
      });
    })
  });
});
