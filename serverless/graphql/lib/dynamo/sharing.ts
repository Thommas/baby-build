/**
 * Path of child
 *
 * GraphQL - Dynamo - Sharing
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import { Entity } from '../model';
import { querySharingsBySharerId } from '../elasticsearch/sharing';

export function getSharings(sharerId: string) {
  return querySharingsBySharerId(sharerId)
    .then((sharings) => {
      const params: any = sharings.hits.hits.map((hit: any) => ({id: hit._id}));
      if (params.length === 0) {
        return [];
      }
      return Entity.batchGet(params);
    });
}

export function createSharing(args: any, userId: string) {
  const id = generate('0123456789', 20);
  const entity = new Entity({
    id: `Sharing-${id}`,
    userId,
    sharerId: args.sharerId
  });
  return entity.save();
}

export function deleteSharing(args: any, userId: string) {
  return Entity.get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Sharing not found');
      }
      if (entity.userId !== userId) {
        throw new Error('Unauthorized');
      }
      return entity.delete();
    });
}
