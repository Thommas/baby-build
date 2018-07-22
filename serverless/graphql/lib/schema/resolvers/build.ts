/**
 * Path of child
 *
 * GraphQL - Resolvers - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbBuild from '../../dynamo/build';

export default {
  Query: {
    builds: (_, args, context) => dbBuild.getBuilds(context.userId),
    build: (_, args, context) => dbBuild.getBuild(args, context.userId),
  },
  Mutation: {
    createBuild: (_, args, context) => dbBuild.createBuild(args, context.userId),
    updateBuild: (_, args, context) => dbBuild.updateBuild(args, context.userId),
    deleteBuild: (_, args, context) => dbBuild.deleteBuild(args, context.userId),
  }
};
