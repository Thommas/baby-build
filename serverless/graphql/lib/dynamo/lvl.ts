/**
 * Path of child
 *
 * GraphQL - Dynamo - Lvl
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import Lvl from '../model/lvl';

export function getLvls(args, userId) {
  const params: any = {
    skillId: {eq: args.skillId},
    userId: {eq: userId}
  };
  return Lvl.scan(params).exec();
}

export function createLvl(args, userId) {
  const lvl = new Lvl({
    id: generate('0123456789', 20),
    userId: userId,
    ...args
  });
  return lvl.save();
}

export function updateLvl(args, userId) {
  return Lvl.get(args.id)
    .then((lvl: any) => {
      if (!lvl) {
        throw new Error('Lvl not found');
      }
      if (args.label) {
        lvl.label = args.label;
      }
      if (args.description) {
        lvl.description = args.description;
      }
      return lvl.save();
    });
}

export function deleteLvl(args, userId) {
  return Lvl.get(args.id)
    .then((lvl: any) => {
      if (!lvl) {
        throw new Error('Lvl not found');
      }
      return lvl.delete();
    });
}
