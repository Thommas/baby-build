/**
 * Path of child
 *
 * GraphQL - Resolvers - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbUser from '../../dynamo/user';

export default {
  Query: {
    user: (_, args, context) => dbUser.getUser(args.id),
    authUser: (_, args, context) => dbUser.getUser(context.userId),
  },
  Mutation: {
    updateUser: (_, args, context) => dbUser.updateUser(args, context.userId),
  }
};
