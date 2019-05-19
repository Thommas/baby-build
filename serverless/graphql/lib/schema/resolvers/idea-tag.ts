/**
 * Path of child
 *
 * GraphQL - Resolvers - IdeaTag
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbTag from '../../dynamo/tag';
import * as dbIdeaTag from '../../dynamo/idea-tag';
import * as dbUser from '../../dynamo/user';

export default {
  IdeaTag: {
    tag: (obj) => dbTag.getTag(obj.tagId),
  },
  Query: {
    ideaTags: (_, args, context) => dbIdeaTag.getIdeaTags(args, context.userId),
  },
  Mutation: {
    createIdeaTag: (_, args, context) => dbIdeaTag.createIdeaTag(args, context.userId),
    deleteIdeaTag: (_, args, context) => dbIdeaTag.deleteIdeaTag(args, context.userId),
  }
};
