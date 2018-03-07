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
    children: () => dbChild.getChildren(),
    child: (_, args) => dbChild.getChildById(args.id),
  },
  Mutation: {
    createChild: (_, args) => dbChild.createChild(args),
    updateChild: (_, args) => dbChild.updateChild(args),
    deleteChild: (_, args) => dbChild.deleteChild(args),
  },
  Child: {
    gamification: child => dbGamification.getGamification('child', child.id),
    builds: child => dbBuild.getBuildsByChild(child.id),
  },
};
