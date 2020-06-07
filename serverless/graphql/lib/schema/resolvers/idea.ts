/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbFile from '../../dynamo/file';
import * as dbIdea from '../../dynamo/idea';
import * as dbUser from '../../dynamo/user';

export default {
  Idea: {
    imgs: (obj) => obj.imgs,
    user: (obj) => dbUser.getUser(obj.userId),
    audios: (obj) => dbFile.getFiles(obj.audios),
  },
  Query: {
    ideas: (_, args, context) => dbIdea.getIdeas(context.userId, args),
  },
  Mutation: {
    createIdea: (_, args, context) => dbIdea.createIdea(args, context.userId),
    updateIdea: (_, args, context) => dbIdea.updateIdea(args, context.userId),
    deleteIdea: (_, args, context) => dbIdea.deleteIdea(args, context.userId),
    addAudio: (_, args, context) => dbIdea.addAudio(args, context.userId),
    removeAudio: (_, args, context) => dbIdea.removeAudio(args, context.userId),
  }
};
