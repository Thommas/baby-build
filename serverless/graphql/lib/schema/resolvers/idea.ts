/**
 * Path of child
 *
 * GraphQL - Resolvers - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbIdea from '../../dynamo/idea';
import * as dbUser from '../../dynamo/user';

export default {
  Idea: {
    user: (obj) => dbUser.getUser(obj.userId),
  },
  Query: {
    ideas: (_, args, context) => {
      console.log('context', context);
      return dbIdea.getIdeas(context.userId, args);
    },
  },
  Mutation: {
    createIdea: (_, args, context) => dbIdea.createIdea(args, context.userId),
    updateIdea: (_, args, context) => dbIdea.updateIdea(args, context.userId),
    deleteIdea: (_, args, context) => dbIdea.deleteIdea(args, context.userId),
  }
};
