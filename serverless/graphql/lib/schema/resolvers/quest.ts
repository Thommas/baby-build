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
    quests: () => dbQuest.getQuests(),
    quest: (_, args) => dbQuest.getQuestById(args.id),
  },
  Mutation: {
    createQuest: (_, args) => dbQuest.createQuest(args),
    updateQuest: (_, args) => dbQuest.updateQuest(args),
    deleteQuest: (_, args) => dbQuest.deleteQuest(args),
  }
};
