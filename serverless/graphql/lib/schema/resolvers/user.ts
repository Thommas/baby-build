/**
 * Path of build
 *
 * GraphQL - Resolvers - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbUser from '../../dynamo/user';

export default {
  Query: {
    users: (_, args, context) => dbUser.getUsers(),
    user: (_, args, context) => dbUser.getUserById(args.id),
    authUser: (_, args, context) => dbUser.getUserByIdOrCreate(context.userId),
  },
  Mutation: {
    updateUser: (_, args, context) => dbUser.updateUser(args, context.userId),
  }
};
