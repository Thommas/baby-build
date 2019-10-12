/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import { Entity } from '../model';
import { createIdeaTag } from './idea-tag';
import { queryIdeas } from '../elasticsearch/idea';
import { querySharingsByUserId } from '../elasticsearch/sharing';
import { fetchImage } from '../puppeteer';
import { storeBase64File } from '../s3';

export function getIdeas(userId: string, args: any) {
  const ideaInput = args.ideaInput;
  const cursor = args.cursor;
  console.log('cursor', cursor);
  return querySharingsByUserId(userId)
    .then((sharings) => {
      const userIds = sharings.hits.hits.map((hit: any) => hit._source.sharerId);
      userIds.push(userId);
      return queryIdeas(userIds, ideaInput, '-createdAt', cursor)
    })
    .then((ideas) => {
      console.log('ideas', ideas);
      if (0 === ideas.hits.total.value || 0 === ideas.hits.hits.length) {
        return {
          total: 0,
          cursor: '-1',
          nodes: [],
        };
      }
      const params: any = ideas.hits.hits.map((hit: any) => ({id: hit._id}));
      return {
        total: ideas.hits.total.value,
        cursor: ideas.hits.hits[ideas.hits.hits.length - 1]._source['createdAt'],
        nodes: Entity.batchGet(params),
      };
    });
}

export function createIdea(args: any, userId: string) {
  const id = generate('0123456789', 20);
  const entity = new Entity({
    id: `Idea-${id}`,
    userId,
    icon: null,
    ...args
  });
  return entity.save().then((idea) => {
    if (!args.tagId) {
      return idea;
    }
    return createIdeaTag({
      ideaId: idea.id,
      tagId: args.tagId,
    }, userId).then(() => {
      return idea;
    });
  });
}

export function updateIdea(args: any, userId: string) {
  return Entity.get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Idea not found');
      }
      // FIXME Need to check sharing permission
      // if (entity.userId !== userId) {
      //   throw new Error('Unauthorized');
      // }
      entity.label = args.label;
      entity.requiredAge = args.requiredAge;
      entity.score = args.score;
      return entity.save();
    });
}

export function updateIdeaIcon(args: any, userId: string) {
  return Entity.get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Idea not found');
      }
      // FIXME Need to check sharing permission
      // if (entity.userId !== userId) {
      //   throw new Error('Unauthorized');
      // }
      return fetchImage(entity.label)
        .then((imageData: string) => {
          if (null === imageData) {
            throw new Error('Cannot fetch image');
          }
          return storeBase64File(`idea-icon/${userId}/${entity.id}`, imageData);
        })
        .then((icon: string) => {
          entity.icon = icon;
          return entity.save();
        });
    })
}

export function deleteIdea(args: any, userId: string) {
  return Entity.get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Idea not found');
      }
      if (entity.userId !== userId) {
        throw new Error('Unauthorized');
      }
      return entity.delete();
    });
}
