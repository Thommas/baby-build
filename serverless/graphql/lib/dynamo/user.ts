/**
 * Path of child
 *
 * GraphQL - Dynamo - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import User from '../model/user';

export function getAuthUser(userId) {
  return User.get(userId)
    .then((user: any) => {
      if (!user) {
        user = new User();
        user.id = userId;
        user.xp = 0;
        user.lvl = 1;
        return user.save();
      }
      return user;
    });
}

export function getUser(args) {
  return User.get(args.id)
    .then((user: any) => {
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    });
}

export function updateUser(args, userId) {
  return User.get(args.id)
    .then((user: any) => {
      if (!user) {
        throw new Error('User not found');
      }
      if (args.currentBuildId) {
        user.currentBuildId = args.currentBuildId;
      }
      return user.save();
    });
}
