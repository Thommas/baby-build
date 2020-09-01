/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { nanoid } from 'nanoid'
import { querySharingsBySharerId } from '../elasticsearch/sharing';
import { dynamoService } from '../services';

export function getSharings(sharerId: string) {
  return querySharingsBySharerId(sharerId)
    .then((sharings) => {
      const params: any = sharings.hits.hits.map((hit: any) => ({id: hit._id}));
      if (params.length === 0) {
        return [];
      }
      return dynamoService.getEntity().batchGet(params);
    });
}

export function createSharing(args: any, userId: string) {
  const id = nanoid();
  const Entity = dynamoService.getEntity();
  const entity = new Entity({
    id: `Sharing-${id}`,
    sharerId: userId,
    userId: args.userId,
  });
  return dynamoService.persist(entity);
}

export function deleteSharing(args: any, userId: string) {
  return dynamoService.getEntity().get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Sharing not found');
      }
      if (entity.sharerId !== userId) {
        throw new Error('Unauthorized');
      }
      return entity.delete();
    });
}
