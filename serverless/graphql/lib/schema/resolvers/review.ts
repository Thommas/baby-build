/**
 * Path of child
 *
 * GraphQL - Resolvers - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbReview from '../../dynamo/review';

export default {
  Query: {
    reviews: (_, args, context) => dbReview.getReviews(args.ideaId),
  },
  Mutation: {
    createReview: (_, args, context) => dbReview.createReview(args, context.userId),
    updateReview: (_, args, context) => dbReview.updateReview(args, context.userId),
  }
};
