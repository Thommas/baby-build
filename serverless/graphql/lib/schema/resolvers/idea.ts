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
  	loggedIdeaUser: (_, args, context) => dbIdeaUser.getLoggedIdeaUser(_.id, context.userId),
  },
  Mutation: {
    createIdea: (_, args, context) => dbIdea.createIdea(args, context.userId),
    deleteIdea: (_, args, context) => dbIdea.deleteIdea(args, context.userId),
  }
};
