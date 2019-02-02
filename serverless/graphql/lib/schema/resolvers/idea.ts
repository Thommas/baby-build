/**
 * Path of child
 *
 * GraphQL - Resolvers - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbIdea from '../../dynamo/idea';
import * as dbIdeaUser from '../../dynamo/idea-user';

export default {
  Idea: {
    loggedIdeaUser: (_, args, context) => dbIdeaUser.getLoggedIdeaUser(_.id, context.userId),
  },
  Query: {
    ideas: (_, args, context) => dbIdea.getIdeas(context.userId, args),
  },
  Mutation: {
    createIdea: (_, args, context) => dbIdea.createIdea(args, context.userId),
    updateIdea: (_, args, context) => dbIdea.updateIdea(args, context.userId),
    deleteIdea: (_, args, context) => dbIdea.deleteIdea(args, context.userId),
  }
};
