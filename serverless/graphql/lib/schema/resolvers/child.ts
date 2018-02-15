/**
 * VGADB
 *
 * GraphQL - Resolvers
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbChilds from '../../dynamo/child';
import * as dbBuilds from '../../dynamo/build';

export default {
  Query: {
    childs: () => dbChilds.getChilds(),
    child: (_, args) => dbChilds.getChildById(args.id),
  },
  Mutation: {
    createChild: (_, args) => dbChilds.createChild(args),
    updateChild: (_, args) => dbChilds.updateChild(args),
    deleteChild: (_, args) => dbChilds.deleteChild(args),
  },
  Child: {
    builds: child => dbBuilds.getBuildsByChild(child.id),
  },
};
