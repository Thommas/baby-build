/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbSharing from '../../dynamo/sharing';
import * as dbUser from '../../dynamo/user';

export default {
  Sharing: {
    user: (obj) => dbUser.getUser(obj.userId),
  },
  Query: {
    sharings: (_, args, context) => dbSharing.getSharings(context.userId),
  },
  Mutation: {
    createSharing: (_, args, context) => dbSharing.createSharing(args, context.userId),
    deleteSharing: (_, args, context) => dbSharing.deleteSharing(args, context.userId),
  }
};
