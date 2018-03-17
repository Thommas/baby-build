/**
 * Path of child
 *
 * GraphQL - Resolvers - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbGamification from '../../dynamo/gamification';
import * as dbUser from '../../dynamo/user';

export default {
  Query: {
    users: (_, args, context) => dbUser.getUsers(context.user_id),
    user: (_, args, context) => dbUser.getUserById(args.id, context.user_id),
    authUser: (_, args, context) => dbUser.getUserById(context.user_id),
  },
  Mutation: {
    createUser: (_, args, context) => dbUser.createUser(args, context.user_id),
    updateUser: (_, args, context) => dbUser.updateUser(args, context.user_id),
    deleteUser: (_, args, context) => dbUser.deleteUser(args, context.user_id),
  },
  User: {
    gamification: user => dbGamification.getGamification('user', user.id),
  }
};
