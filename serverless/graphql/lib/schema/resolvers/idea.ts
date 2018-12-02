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
  Query: {
    ideas: (_, args, context) => dbIdea.getIdeas(context.userId),
  	loggedUserIdea: (_, args, context) => dbIdeaUser.getLoggedUserIdea(_.id, context.userId),
  },
  Mutation: {
    createIdea: (_, args, context) => dbIdea.createIdea(args, context.userId),
    updateIdea: (_, args, context) => dbIdea.updateIdea(args, context.userId),
    deleteIdea: (_, args, context) => dbIdea.deleteIdea(args, context.userId),
  }
};
