/**
 * Path of child
 *
 * GraphQL - Resolvers - Quest
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbQuest from '../../dynamo/quest';

export default {
  Query: {
    quests: (_, args, context) => dbQuest.getQuests(args.build_id, args.child_year, context.user_id),
  },
  Mutation: {
    createQuest: (_, args, context) => dbQuest.createQuest(args, context.user_id),
    updateQuest: (_, args, context) => dbQuest.updateQuest(args, context.user_id),
    deleteQuest: (_, args, context) => dbQuest.deleteQuest(args, context.user_id),
  }
};
