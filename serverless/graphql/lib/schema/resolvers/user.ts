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
    users: () => dbUser.getUsers(),
    user: (_, args) => dbUser.getUserById(args.id),
  },
  Mutation: {
    createUser: (_, args) => dbUser.createUser(args),
    updateUser: (_, args) => dbUser.updateUser(args),
    deleteUser: (_, args) => dbUser.deleteUser(args),
  }
};
