/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { fileRepository } from '../../repository/file.repository';
import * as ideaRepository from '../../repository/idea.repository';
import * as userRepository from '../../repository/user.repository';

export default {
  Idea: {
    icons: (obj) => fileRepository.getFilesByIds(obj.icons),
    user: (obj) => userRepository.getUser(obj.userId),
  },
  Query: {
    ideas: (_, args, context) => ideaRepository.getIdeas(context.userId, args),
  },
  Mutation: {
    createIdea: (_, args, context) => ideaRepository.createIdea(args, context.userId),
    updateIdea: (_, args) => ideaRepository.updateIdea(args),
    deleteIdea: (_, args, context) => ideaRepository.deleteIdea(args, context.userId),
  }
};
