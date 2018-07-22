/**
 * Path of child
 *
 * GraphQL - Dynamo - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import User from '../model/user';

export function getUser(userId) {
  return User.get(userId)
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
        user = new User();
        user.id = userId;
      }
      return user.save();
    });
}
