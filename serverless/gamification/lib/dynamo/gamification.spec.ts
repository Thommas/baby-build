/**
 * Path of child
 *
 * Gamification - Dynamo - Gamification
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { getLevel, addXp } from './gamification'
import * as db from './dynamo';

describe('Gamification', function() {
  it('getLevel', function() {
    expect(getLevel(0)).toEqual(1);
    expect(getLevel(50)).toEqual(1);
    expect(getLevel(524)).toEqual(1);
    expect(getLevel(525)).toEqual(2);
    expect(getLevel(1234)).toEqual(2);
    expect(getLevel(1235)).toEqual(3);
    expect(getLevel(294631835)).toEqual(98);
    expect(getLevel(294631836)).toEqual(99);
    expect(getLevel(294631837)).toEqual(99);
  });

  it('addXp - Create', function() {
    spyOn(db, 'get').and.returnValue(new Promise((resolve) =>
      resolve()
    ))
    spyOn(db, 'createItem').and.returnValue(new Promise((resolve) =>
      resolve('mockData')
    ))
    addXp('build', '1234', 42).then((data) => {
      expect(data).toEqual('mockData');
    })
  });

  it('addXp - Update', function() {
    spyOn(db, 'get').and.returnValue(new Promise((resolve) =>
      resolve({ id: 42 })
    ))
    spyOn(db, 'updateItem').and.returnValue(new Promise((resolve) =>
      resolve('mockData')
    ))
    addXp('build', '1234', 42).then((data) => {
      expect(data).toEqual('mockData');
    })
  });
});
