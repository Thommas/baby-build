/**
 * Path of child
 *
 * GraphQL - Resolvers - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbIdeaUser from '../../dynamo/idea-user';

export default {
  Query: {
    ideaUsers: (_, args, context) => dbIdeaUser.getIdeaUsers(args.ideaId),
  },
  Mutation: {
    createIdeaUser: (_, args, context) => dbIdeaUser.createIdeaUser(args, context.userId),
    updateIdeaUser: (_, args, context) => dbIdeaUser.updateIdeaUser(args, context.userId),
  }
};
