/**
 * Path of child
 *
 * GraphQL - Resolvers - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbTag from '../../dynamo/tag';
import * as dbUser from '../../dynamo/user';

export default {
  Tag: {
    user: (obj) => dbUser.getUser(obj.userId),
  },
  Query: {
    tags: (_, args, context) => dbTag.getTags(context.userId),
  },
  Mutation: {
    createTag: (_, args, context) => dbTag.createTag(args, context.userId),
    updateTag: (_, args, context) => dbTag.updateTag(args, context.userId),
    deleteTag: (_, args, context) => dbTag.deleteTag(args, context.userId),
  }
};
