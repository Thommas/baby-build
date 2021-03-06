/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { nanoid } from 'nanoid'
import { queryReviews } from '../elasticsearch/review';
import { dynamoService } from '../services';

export function getReviews(ideaId: string) {
  return queryReviews(ideaId).then((reviews) => {
    const params: any = reviews.hits.hits.map((hit: any) => ({id: hit._id}));
    if (params.length === 0) {
      return [];
    }
    return dynamoService.getEntity().batchGet(params);
  });
}

export function createReview(args: any, userId: string) {
  const id = nanoid();
  const Entity = dynamoService.getEntity();
  const entity = new Entity({
    id: `Review-${id}`,
    userId,
    ...args
  });
  return entity.save();
}

export function updateReview(args: any, userId: string) {
  return dynamoService.getEntity().get(args.id)
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
