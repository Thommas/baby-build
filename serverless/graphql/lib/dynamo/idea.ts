/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import { Idea } from '../model';
import { queryIdeas } from '../elasticsearch/idea';

export function getIdeas(userId: string, args: any) {
  console.log('args', args);
  return queryIdeas(userId, args).then((ideas) => {
    const params: any = ideas.hits.hits.map((hit: any) => ({id: hit._id}));
    console.log('params', params);
    if (params.length === 0) {
      return [];
    }
    return Idea.batchGet(params);
  });
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
      if (idea.userId !== userId) {
        throw new Error('Unauthorized');
      }
      idea.label = args.label;
      return idea.save();
    });
}

export function deleteIdea(args, userId) {
  return Idea.get(args.id)
    .then((idea: any) => {
      if (!idea) {
        throw new Error('Idea not found');
      }
      if (idea.userId !== userId) {
        throw new Error('Unauthorized');
      }
      return idea.delete();
    });
}
