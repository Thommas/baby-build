/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as reviewRepository from '../../repository/review.repository';
import * as userRepository from '../../repository/user.repository';

export default {
  Review: {
    user: (obj) => userRepository.getUser(obj.userId),
  },
  Query: {
    reviews: (_, __) => [],//reviewRepository.getReviews(args.ideaId),
  },
  Mutation: {
    createReview: (_, args, context) => reviewRepository.createReview(args, context.userId),
    updateReview: (_, args, context) => reviewRepository.updateReview(args, context.userId),
  }
};
