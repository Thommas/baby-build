/**
 * Path of build
 *
 * GraphQL - Resolvers - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbBuild from '../../dynamo/build';

export default {
  Query: {
    builds: (_, args, context) => dbBuild.getBuilds(context.user_id),
    build: (_, args, context) => dbBuild.getBuildById(args.id, context.user_id),
  },
  Mutation: {
    createBuild: (_, args, context) => dbBuild.createBuild(args, context.user_id),
    updateBuild: (_, args, context) => dbBuild.updateBuild(args, context.user_id),
    deleteBuild: (_, args, context) => dbBuild.deleteBuild(args, context.user_id),
  }
};
