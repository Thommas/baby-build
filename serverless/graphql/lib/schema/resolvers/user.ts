/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbUser from '../../dynamo/user';

export default {
  Query: {
    user: (_, args, context) => dbUser.getUser(args.id),
    users: (_, args, context) => dbUser.getUsers(args),
    authUser: (_, args, context) => dbUser.getAuthUser(context.userId),
  },
  Mutation: {
    updateUser: (_, args, context) => dbUser.updateUser(args, context.userId),
  }
};
