/**
 * Path of child
 *
 * GraphQL - Dynamo - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import { Entity } from '../model';

export function getAuthUser(userId: string) {
  return Entity.get(userId)
    .then((entity: any) => {
      if (!entity) {
        entity = new Entity();
        entity.type = 'user';
        entity.id = userId;
        entity.xp = 0;
        entity.lvl = 1;
        return entity.save();
      }
      return entity;
    });
}

export function getUser(userId: string) {
  return Entity.get(userId)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('User not found');
      }
      return entity;
    });
}

export function updateUser(args: any, userId: string) {
  return Entity.get(userId)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('User not found');
      }
      entity.firstName = args.firstName;
      entity.lastName = args.lastName;
      return entity.save();
    });
}
