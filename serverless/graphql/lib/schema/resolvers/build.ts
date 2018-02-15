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
    builds: () => dbBuilds.getBuilds(),
    build: (_, args) => dbBuilds.getBuildById(args.id),
  },
  Mutation: {
    createBuild: (_, args) => dbBuilds.createBuild(args),
    updateBuild: (_, args) => dbBuilds.updateBuild(args),
    deleteBuild: (_, args) => dbBuilds.deleteBuild(args),
  }
};
