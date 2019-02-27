/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import { Entity } from '../model';
import { queryReviews } from '../elasticsearch/review';

export function getReviews(ideaId) {
  return queryReviews(ideaId).then((reviews) => {
    const params: any = reviews.hits.hits.map((hit: any) => ({id: hit._id}));
    console.log('params', params);
    if (params.length === 0) {
      return [];
    }
    return Entity.batchGet(params);
  });
}

export function createReview(args, userId) {
  const id = generate('0123456789', 20);
  const review = new Entity({
    id: `Review-${id}`,
    userId,
    ...args
  });
  return review.save();
}

export function updateReview(args, userId) {
  return Entity.get(args.id)
    .then((review: any) => {
      if (!review) {
        throw new Error('Idea not found');
      }
      if (review.userId !== userId) {
        throw new Error('Unauthorized');
      }
      Object.assign(review, args);
      return review.save();
    });
}
