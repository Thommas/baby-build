/**
 * Path of child
 *
 * GraphQL - Dynamo - Review
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import { Entity } from '../model';
import { queryReviews } from '../elasticsearch/review';

export function getReviews(ideaId: string) {
  return queryReviews(ideaId).then((reviews) => {
    const params: any = reviews.hits.hits.map((hit: any) => ({id: hit._id}));
    if (params.length === 0) {
      return [];
    }
    return Entity.batchGet(params);
  });
}

export function createReview(args: any, userId: string) {
  const id = generate('0123456789', 20);
  const entity = new Entity({
    id: `Review-${id}`,
    userId,
    ...args
  });
  return entity.save();
}

export function updateReview(args: any, userId: string) {
  return Entity.get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Idea not found');
      }
      if (entity.userId !== userId) {
        throw new Error('Unauthorized');
      }
      Object.assign(entity, args);
      return entity.save();
    });
}
