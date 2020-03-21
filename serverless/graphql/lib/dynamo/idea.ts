/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import { orderBy } from 'lodash';
import { Entity } from '../model';
import { queryIdeas } from '../elasticsearch/idea';
import { querySharingsByUserId } from '../elasticsearch/sharing';
import { fetchImage } from '../puppeteer';

export function getIdeas(userId: string, args: any) {
  const ideaInput = args.ideaInput;
  const cursor = args.cursor;
  return querySharingsByUserId(userId)
    .then((sharings) => {
      const userIds = sharings.hits.hits.map((hit: any) => hit._source.sharerId);
      userIds.push(userId);
      return queryIdeas(userIds, ideaInput, '-createdAt', cursor)
    })
    .then((ideas) => {
      if (0 === ideas.hits.total.value || 0 === ideas.hits.hits.length) {
        return {
          total: 0,
          cursor: '-1',
          nodes: [],
        };
      }
      const params: any = ideas.hits.hits.map((hit: any) => ({id: hit._id}));
      return Entity.batchGet(params).then((items: any) => {
        return {
          total: ideas.hits.total.value,
          cursor: ideas.hits.hits[ideas.hits.hits.length - 1]._source['createdAt'],
          nodes: orderBy(items, [
            (item: any) => new Date(item.createdAt),
            'id',
          ], [
            'desc',
            'asc',
          ]),
        }
      });
    })
}

export function createIdea(args: any, userId: string) {
  const id = generate('0123456789', 20);
  return fetchImage(args.label)
    .then((imageData: string) => {
      if (null === imageData) {
        throw new Error('Cannot fetch image');
      }
      return imageData;
    })
    .then((icon: string) => {
      const entity = new Entity({
        id: `Idea-${id}`,
        userId,
        icon,
        ...args
      });
      return entity.save();
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
      if (args.label) {
        entity.label = args.label;
      }
      if (args.requiredAge) {
        entity.requiredAge = args.requiredAge;
      }
      if (args.score) {
        entity.score = args.score;
      }
      if (args.category) {
        entity.category = args.category;
      }
      return entity.save();
    });
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
