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
    users: (_, args, context) => dbUser.getUsers(),
    user: (_, args, context) => dbUser.getUserById(args.id),
    authUser: (_, args, context) => dbUser.getUserByIdOrCreate(context.user_id),
  },
  Mutation: {
    updateUser: (_, args, context) => dbUser.updateUser(args, context.user_id),
  },
  User: {
    gamification: user => dbGamification.getGamification('user', user.id),
  }
};
