/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import Idea from '../model/idea';

export function getIdeas(args, userId) {
  const params: any = {
    childId: {eq: args.childId},
    userId: {eq: userId}
  };
  return Idea.scan(params).exec();
}

export function createIdea(args, userId) {
  const idea = new Idea({
    id: generate('0123456789', 20),
    userId: userId,
    ...args
  });
  return idea.save();
}

export function updateIdea(args, userId) {
  return Idea.get(args.id)
    .then((idea: any) => {
      if (!idea) {
        throw new Error('Idea not found');
      }
      if (args.label) {
        idea.label = args.label;
      }
      return idea.save();
    });
}

export function deleteIdea(args, userId) {
  return Idea.get(args.id)
    .then((idea: any) => {
      if (!idea) {
        throw new Error('Idea not found');
      }
      return idea.delete();
    });
}
