/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbWorld from '../../dynamo/world';
import * as dbCharacter from '../../dynamo/character';

export default {
  World: {
    characters: (obj) => dbCharacter.getCharactersByIds(obj.characters),
  },
  Query: {
    world: (_, args, context) => dbWorld.getWorld(context.userId, args),
    worlds: (_, args, context) => dbWorld.getWorlds(context.userId, args),
  },
  Mutation: {
    createWorld: (_, args, context) => dbWorld.createWorld(args, context.userId),
    updateWorld: (_, args, context) => dbWorld.updateWorld(args, context.userId),
    deleteWorld: (_, args, context) => dbWorld.deleteWorld(args, context.userId),
    addCharacter: (_, args, context) => dbWorld.addCharacter(args, context.userId),
    removeCharacter: (_, args, context) => dbWorld.removeCharacter(args, context.userId),
  }
};
