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
    const ids: any = reviews.hits.hits.map((hit: any) => hit._id);
    if (ids.length === 0) {
      return [];
    }
    return dynamoService.batchGet(ids);
  });
}

export function createReview(args: any, userId: string) {
  const id = nanoid();
  return dynamoService.createDocument({
    id: `Review-${id}`,
    userId,
    ...args
  });
}

export function updateReview(args: any, userId: string) {
  return dynamoService.get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Idea not found');
      }
      if (entity.userId !== userId) {
        throw new Error('Unauthorized');
      }
      Object.assign(entity, args);
      return dynamoService.createDocument(entity);
    });
}
