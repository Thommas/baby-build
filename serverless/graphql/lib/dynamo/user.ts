/**
 * Path of child
 *
 * GraphQL - Dynamo - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import { Entity } from '../model';

export function getAuthUser(userId) {
  return Entity.get(`User-${userId}`)
    .then((user: any) => {
      if (!user) {
        user = new Entity();
        user.id = userId;
        user.xp = 0;
        user.lvl = 1;
        return user.save();
      }
      return user;
    });
}

export function getUser(args) {
  return Entity.get(`User-${args.id}`)
    .then((user: any) => {
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    });
}

export function updateUser(args, userId) {
  return Entity.get(`User-${args.id}`)
    .then((user: any) => {
      if (!user) {
        throw new Error('User not found');
      }
      return user.save();
    });
}
