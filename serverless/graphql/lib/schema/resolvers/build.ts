/**
 * Path of child
 *
 * GraphQL - Resolvers - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbBuild from '../../dynamo/build';
import * as dbChild from '../../dynamo/child';
import * as dbGamification from '../../dynamo/gamification';
import * as dbQuest from '../../dynamo/quest';

export default {
  Query: {
    builds: (_, args, context) => dbBuild.getBuilds(context.user_id),
    build: (_, args, context) => dbBuild.getBuildById(args.id, context.user_id),
  },
  Mutation: {
    createBuild: (_, args, context) => dbBuild.createBuild(args, context.user_id),
    updateBuild: (_, args, context) => dbBuild.updateBuild(args, context.user_id),
    deleteBuild: (_, args, context) => dbBuild.deleteBuild(args, context.user_id),
  },
  Build: {
    gamification: (build, args, context) => dbGamification.getGamification('build', build.id),
    child: (build, args, context) => dbChild.getChildById(build.child_id, context.user_id),
    quests: (build, args, context) => dbQuest.getQuestsByBuild(build.id, context.user_id),
  },
};
