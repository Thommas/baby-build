/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as ideaRepository from '../../repository/idea';
import * as userRepository from '../../repository/user';

export default {
  Idea: {
    imgs: (obj) => obj.imgs,
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
