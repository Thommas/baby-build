/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbWorld from '../../dynamo/world';
import * as dbIdea from '../../dynamo/idea';

export default {
  World: {
    ideas: (obj) => dbIdea.getIdeasByIds(obj.ideas),
  },
  Query: {
    world: (_, args, context) => dbWorld.getWorld(context.userId, args),
    worlds: (_, args, context) => dbWorld.getWorlds(context.userId, args),
  },
  Mutation: {
    createWorld: (_, args, context) => dbWorld.createWorld(args, context.userId),
    updateWorld: (_, args, context) => dbWorld.updateWorld(args, context.userId),
    deleteWorld: (_, args, context) => dbWorld.deleteWorld(args, context.userId),
  }
};
