/**
 * Path of child
 *
 * GraphQL - Dynamo - IdeaTag
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import { Entity } from '../model';
import { queryIdeaTagsByIdeaId } from '../elasticsearch/idea-tag';

export function getIdeaTags(args: any, userId: string) {
  return queryIdeaTagsByIdeaId(args.ideaId)
    .then((ideaTags) => {
      const params: any = ideaTags.hits.hits.map((hit: any) => ({id: hit._id}));
      if (params.length === 0) {
        return [];
      }
      return Entity.batchGet(params);
    });
}

export function createIdeaTag(args: any, userId: string) {
  const id = generate('0123456789', 20);
  const entity = new Entity({
    id: `IdeaTag-${id}`,
    userId,
    ...args
  });
  return entity.save();
}

export function deleteIdeaTag(args: any, userId: string) {
  return Entity.get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('IdeaTag not found');
      }
      if (entity.userId !== userId) {
        throw new Error('Unauthorized');
      }
      return entity.delete();
    });
}
