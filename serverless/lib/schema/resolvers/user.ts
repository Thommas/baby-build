/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbUser from '../../dynamo/user';

export default {
  Query: {
    user: (_, args) => dbUser.getUser(args.id),
    users: (_, args) => dbUser.getUsers(args),
    authUser: (_, __, context) => dbUser.getAuthUser(context.userId),
  },
  Mutation: {
    updateUser: (_, args, context) => dbUser.updateUser(args, context.userId),
  }
};
