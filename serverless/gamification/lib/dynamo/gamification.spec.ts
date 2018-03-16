/**
 * Path of child
 *
 * Gamification - Dynamo - Gamification
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { updateGamification } from './gamification'
import * as db from './dynamo';

describe('Gamification', function() {
  it('updateGamification - Create', function() {
    spyOn(db, 'get').and.returnValue(new Promise((resolve) =>
      resolve()
    ))
    spyOn(db, 'createItem').and.returnValue(new Promise((resolve) =>
      resolve('mockData')
    ))
    updateGamification('build', '1234', 1, 2).then((data) => {
      expect(data).toEqual('mockData');
    })
  });

  it('updateGamification - Update', function() {
    spyOn(db, 'get').and.returnValue(new Promise((resolve) =>
      resolve({ id: 42 })
    ))
    spyOn(db, 'updateItem').and.returnValue(new Promise((resolve) =>
      resolve('mockData')
    ))
    updateGamification('build', '1234', 1, 2).then((data) => {
      expect(data).toEqual('mockData');
    })
  });
});
