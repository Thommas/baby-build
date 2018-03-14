/**
 * Path of child
 *
 * GraphQL - Resolvers - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbBuild from '../../dynamo/build';
import * as dbChild from '../../dynamo/child';
import * as dbGamification from '../../dynamo/gamification';

export default {
  Query: {
    children: (_, args, context) => dbChild.getChildren(context.user_id),
    child: (_, args, context) => dbChild.getChildById(args.id, context.user_id),
  },
  Mutation: {
    createChild: (_, args, context) => dbChild.createChild(args, context.user_id),
    updateChild: (_, args, context) => dbChild.updateChild(args, context.user_id),
    deleteChild: (_, args, context) => dbChild.deleteChild(args, context.user_id),
  },
  Child: {
    gamification: (child, args, context) => dbGamification.getGamification('child', child.id, context.user_id),
    builds: (child, args, context) => dbBuild.getBuildsByChild(child.id, context.user_id),
  },
};
