/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { nanoid } from 'nanoid'
import { orderBy } from 'lodash';
import { queryWorlds } from '../elasticsearch/world';
import { dynamoService } from '../services';

export function getWorld(userId: string, args: any) {
  return dynamoService.getEntity().get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('World not found');
      }
      // FIXME Need to check sharing permission
      // if (entity.userId !== userId) {
      //   throw new Error('Unauthorized');
      // }
      return entity;
    });
}

export function getWorlds(userId: string, args: any) {
  const worldInput = args.worldInput;
  const cursor = args.cursor;
  const sort = args.sort;
  return queryWorlds([userId], worldInput, sort, cursor)
    .then((worlds) => {
      if (0 === worlds.hits.total.value || 0 === worlds.hits.hits.length) {
        return {
          total: 0,
          cursor: '-1',
          nodes: [],
        };
      }
      const params: any = worlds.hits.hits.map((hit: any) => ({id: hit._id}));
      return dynamoService.getEntity().batchGet(params).then((items: any) => {
        return {
          total: worlds.hits.total.value,
          cursor: worlds.hits.hits[worlds.hits.hits.length - 1]._source['createdAt'],
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

export function createWorld(args: any, userId: string) {
  const id = nanoid();
  const Entity = dynamoService.getEntity();
  const entity = new Entity({
    id: `World-${id}`,
    userId,
    imgsReady: false,
    ...args
  });
  return entity.save();
}

export function updateWorld(args: any, userId: string) {
  return dynamoService.getEntity().get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('World not found');
      }
      // FIXME Need to check sharing permission
      // if (entity.userId !== userId) {
      //   throw new Error('Unauthorized');
      // }
      Object.assign(entity, args);
      entity.imgsReady = false;
      return entity.save();
    });
}

export function deleteWorld(args: any, userId: string) {
  return dynamoService.getEntity().get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('World not found');
      }
      if (entity.userId !== userId) {
        throw new Error('Unauthorized');
      }
      return entity.delete();
    });
}

export function addIdea(args: any, userId: string) {
  return dynamoService.getEntity().get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('World not found');
      }
      if (entity.userId !== userId) {
        throw new Error('Unauthorized');
      }
      if (!entity.ideas) {
        entity.ideas = [];
      }
      if (-1 === entity.ideas.indexOf(args.ideaId)) {
        entity.ideas.push(args.ideaId);
      }
      return entity.save();
    });
}

export function removeIdea(args: any, userId: string) {
  return dynamoService.getEntity().get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('World not found');
      }
      if (entity.userId !== userId) {
        throw new Error('Unauthorized');
      }
      if (!entity.ideas) {
        entity.ideas = [];
      }
      const index = entity.ideas.indexOf(args.ideaId);
      if (-1 !== index) {
        entity.ideas.splice(index, 1);
      }
      return entity.save();
    });
}
