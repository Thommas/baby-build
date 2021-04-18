/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { nanoid } from 'nanoid'
import { orderBy } from 'lodash';
import { queryIdeas } from '../elasticsearch/idea';
import { dynamoService } from '../services';

export function getIdeas(userId: string, args: any) {
  const ideaInput = args.ideaInput;
  const page = args.page;
  const sort = args.sort;
  return queryIdeas([userId], ideaInput, sort, page)
    .then((ideas) => {
      if (0 === ideas.hits.total.value || 0 === ideas.hits.hits.length) {
        return {
          total: 0,
          page,
          nodes: [],
        };
      }
      const params: any = ideas.hits.hits.map((hit: any) => ({id: hit._id}));
      return dynamoService.getEntity().batchGet(params).then((items: any) => {
        return {
          total: ideas.hits.total.value,
          page,
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

export function getIdeasByIds(ids: string[]) {
  if (!ids || 0 === ids.length) {
    return [];
  }

  const params: any = ids.map((id: any) => ({ id }));

  return dynamoService.getEntity().batchGet(params);
}

export function createIdea(args: any, userId: string) {
  const id = nanoid();
  const Entity = dynamoService.getEntity();
  const entity = new Entity({
    id: `Idea-${id}`,
    userId,
    imgsReady: false,
    ...args
  });
  return dynamoService.persist(entity);
}

export function updateIdea(args: any) {
  return dynamoService.getEntity().get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Idea not found');
      }
      // FIXME Need to check sharing permission
      // if (entity.userId !== userId) {
      //   throw new Error('Unauthorized');
      // }
      Object.assign(entity, args);
      for (const field in entity) {
        if (entity[field] === null) {
          delete entity[field];
        }
      }
      entity.imgsReady = false;
      return dynamoService.persist(entity);
    });
}

export function deleteIdea(args: any, userId: string) {
  return dynamoService.getEntity().get(args.id)
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
