/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import IdeaUser from '../model/idea-user';

export function getIdeaUsers(ideaId) {
  const params: any = {
    ideaId: {eq: ideaId}
  };
  return IdeaUser.scan(params).exec();
}

export function getLoggedUserIdea(ideaId, userId) {
  const params: any = {
    ideaId: {eq: ideaId},
    userId: {eq: userId}
  };
  return IdeaUser.scan(params)
    .exec()
    .then((ideaUsers: any) => {
      if (ideaUsers.count === 0) {
        throw new Error('IdeaUser not found');
      }
      return ideaUsers[0];
    });
}

export function updateIdeaUser(args, userId) {
  const params: any = {
    ideaId: {eq: args.ideaId},
    userId: {eq: userId}
  };
  return IdeaUser.scan(params)
    .exec()
    .then((ideaUsers: any) => {
      if (ideaUsers.count === 0) {
        throw new Error('IdeaUser not found');
      }
      const ideaUser = ideaUsers[0];
      Object.assign(ideaUser, args);
      return ideaUser.save();
    });
}
