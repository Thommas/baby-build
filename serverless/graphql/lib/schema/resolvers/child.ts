/**
 * Path of child
 *
 * GraphQL - Resolvers
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbChild from '../../dynamo/child';
import * as dbBuild from '../../dynamo/build';

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
    builds: child => dbBuild.getBuildsByChild(child.id),
  },
};
