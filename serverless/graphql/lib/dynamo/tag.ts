/**
 * Path of child
 *
 * GraphQL - Dynamo - Tag
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import { queryTags } from '../elasticsearch/tag';
import { Entity } from '../model';

export function getTags(userId: string) {
  return queryTags(userId)
    .then((entities: any) => {
      const params: any = entities.hits.hits.map((hit: any) => ({id: hit._id}));
      if (params.length === 0) {
        return [];
      }
      return Entity.batchGet(params);
    });
}

export function createTag(args: any, userId: string) {
  const id = generate('0123456789', 20);
  const entity = new Entity({
    id: `Tag-${id}`,
    userId,
    ...args
  });
  return entity.save();
}

export function updateTag(args: any, userId: string) {
  return Entity.get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Tag not found');
      }
      if (entity.userId !== userId) {
        throw new Error('Unauthorized');
      }
      entity.label = args.label;
      return entity.save();
    });
}

export function deleteTag(args: any, userId: string) {
  return Entity.get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Tag not found');
      }
      if (entity.userId !== userId) {
        throw new Error('Unauthorized');
      }
      return entity.delete();
    });
}
