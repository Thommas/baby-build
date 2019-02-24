/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import { Entity } from '../model';
import { queryIdeas } from '../elasticsearch/idea';
import { fetchImage } from '../puppeteer';
import { storeBase64File } from '../s3';

export function getIdeas(userId: string, args: any) {
  return queryIdeas(userId, args).then((ideas) => {
    const params: any = ideas.hits.hits.map((hit: any) => ({id: hit._id}));
    console.log('params', params);
    if (params.length === 0) {
      return [];
    }
    return Entity.batchGet(params);
  });
}

export function createIdea(args, userId) {
  const id = generate('0123456789', 20);
  const idea = new Entity({
    id: `Idea-${id}`,
    userId,
    icon: null,
    ...args
  });
  return idea.save();
}

export function updateIdea(args, userId) {
  return Entity.get(args.id)
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

export function updateIdeaIcon(args, userId) {
  return Entity.get(args.id)
    .then((idea: any) => {
      if (!idea) {
        throw new Error('Idea not found');
      }
      if (idea.userId !== userId) {
        throw new Error('Unauthorized');
      }
      return fetchImage(idea.label)
        .then((imageData: string) => {
          if (null === imageData) {
            throw new Error('Cannot fetch image');
          }
          return storeBase64File(`idea-icon/${userId}/${idea.id}`, imageData);
        })
        .then((icon: string) => {
          idea.icon = icon;
          return idea.save();
        });
    })
}

export function deleteIdea(args, userId) {
  return Entity.get(args.id)
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
