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
    children: (_, args, context) => dbChild.getChildren(context.user_id),
    child: (_, args, context) => dbChild.getChildById(args.id, context.user_id),
  },
  Mutation: {
    createChild: (_, args, context) => dbChild.createChild(args, context.user_id),
    updateChild: (_, args, context) => dbChild.updateChild(args, context.user_id),
    deleteChild: (_, args, context) => dbChild.deleteChild(args, context.user_id),
  }
};
