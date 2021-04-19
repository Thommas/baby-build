/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as userRepository from '../../repository/user';

export default {
  Query: {
    user: (_, args) => userRepository.getUser(args.id),
    users: (_, args) => userRepository.getUsers(args),
    authUser: (_, __, context) => userRepository.getAuthUser(context.userId),
  },
  Mutation: {
    updateUser: (_, args, context) => userRepository.updateUser(args, context.userId),
  }
};
