/**
 * Path of child
 *
 * GraphQL - Resolvers - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbChild from '../../dynamo/child';

export default {
  Query: {
    childs: (_, args, context) => dbChild.getChilds(context.userId),
    child: (_, args, context) => dbChild.getChild(args, context.userId),
  },
  Mutation: {
    createChild: (_, args, context) => dbChild.createChild(args, context.userId),
    updateChild: (_, args, context) => dbChild.updateChild(args, context.userId),
    deleteChild: (_, args, context) => dbChild.deleteChild(args, context.userId),
  }
};
