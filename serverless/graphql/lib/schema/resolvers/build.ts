/**
 * Path of child
 *
 * GraphQL - Resolvers - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbBuild from '../../dynamo/build';
import * as dbQuest from '../../dynamo/quest';

export default {
  Query: {
    builds: () => dbBuild.getBuilds(),
    build: (_, args) => dbBuild.getBuildById(args.id),
  },
  Mutation: {
    createBuild: (_, args) => dbBuild.createBuild(args),
    updateBuild: (_, args) => dbBuild.updateBuild(args),
    deleteBuild: (_, args) => dbBuild.deleteBuild(args),
  },
  Build: {
    quests: build => dbQuest.getQuestsByBuild(build.id),
  },
};
