/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbFile from '../../dynamo/file';
import * as dbCharacter from '../../dynamo/character';
import * as dbUser from '../../dynamo/user';

export default {
  Character: {
    user: (obj) => dbUser.getUser(obj.userId),
    files: (obj) => dbFile.getFilesByIds(obj.files),
  },
  Query: {
    characters: (_, args, context) => dbCharacter.getCharacters(context.userId, args),
  },
  Mutation: {
    createCharacter: (_, args, context) => dbCharacter.createCharacter(args, context.userId),
    updateCharacter: (_, args, context) => dbCharacter.updateCharacter(args, context.userId),
    deleteCharacter: (_, args, context) => dbCharacter.deleteCharacter(args, context.userId),
    addFile: (_, args, context) => dbCharacter.addFile(args, context.userId),
    removeFile: (_, args, context) => dbCharacter.removeFile(args, context.userId),
  }
};
