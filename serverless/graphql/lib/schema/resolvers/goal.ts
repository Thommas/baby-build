/**
 * Path of child
 *
 * GraphQL - Resolvers - Goal
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbGoal from '../../dynamo/goal';

export default {
  Query: {
    goals: (_, args, context) => dbGoal.getGoals(args.build_id, args.year, context.user_id),
  },
  Mutation: {
    createGoal: (_, args, context) => dbGoal.createGoal(args, context.user_id),
    updateGoal: (_, args, context) => dbGoal.updateGoal(args, context.user_id),
    deleteGoal: (_, args, context) => dbGoal.deleteGoal(args, context.user_id),
  }
};
