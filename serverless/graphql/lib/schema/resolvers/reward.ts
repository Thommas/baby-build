/**
 * Path of child
 *
 * GraphQL - Resolvers - Reward
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbReward from '../../dynamo/reward';

export default {
  Query: {
    rewards: (_, args, context) => dbReward.getRewards(args.build_id, args.child_year, context.user_id),
    reward: (_, args, context) => dbReward.getReward(args.id, context.user_id),
  },
  Mutation: {
    createReward: (_, args, context) => dbReward.createReward(args, context.user_id),
    updateReward: (_, args, context) => dbReward.updateReward(args, context.user_id),
    deleteReward: (_, args, context) => dbReward.deleteReward(args, context.user_id),
  }
};
