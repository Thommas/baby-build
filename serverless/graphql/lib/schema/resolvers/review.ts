/**
 * Path of child
 *
 * GraphQL - Resolvers - Review
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbReview from '../../dynamo/review';
import * as dbUser from '../../dynamo/user';

export default {
  Review: {
    user: (obj) => dbUser.getUser(obj.userId),
  },
  Query: {
    reviews: (_, args, context) => dbReview.getReviews(args.ideaId),
  },
  Mutation: {
    createReview: (_, args, context) => dbReview.createReview(args, context.userId),
    updateReview: (_, args, context) => dbReview.updateReview(args, context.userId),
  }
};
