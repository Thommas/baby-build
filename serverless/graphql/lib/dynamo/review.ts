/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import { Entity } from '../model';

export function getReviews(ideaId) {
  // FIXME Query ES here
  const params: any = {
    ideaId: {eq: `Idea-${ideaId}`}
  };
  return Entity.scan(params)
    .exec()
    .catch(e => console.log(e));
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
