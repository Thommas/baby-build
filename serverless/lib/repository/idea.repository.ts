/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { nanoid } from 'nanoid';
import * as dynamoIdea from '../dynamo/idea.dynamo';
import * as elasticsearchIdea from '../elasticsearch/idea.elasticsearch';
import { dynamoService } from '../service';

export function getIdeas(userId: string, args: any): Promise<any> {
  const ideaInput = args.ideaInput;
  const page = args.page;
  const sort = args.sort;
  return elasticsearchIdea.getIdeas([userId], ideaInput, sort, page)
    .then((res) => {
      const ideas = res.body;
      if (0 === ideas.hits.total.value || 0 === ideas.hits.hits.length) {
        return {
          total: 0,
          page,
          nodes: [],
        };
      }
      const ids: any = ideas.hits.hits.map((hit: any) => hit._id);
      return dynamoIdea.getIdeas(
        ids,
        ideas.hits.total.value,
        page
      );
    });
}

export function getIdeasByIds(ids: string[]) {
  if (!ids || 0 === ids.length) {
    return [];
  }

  return dynamoService.batchGet(ids);
}

export function createIdea(args: any, userId: string) {
  const id = nanoid();
  return dynamoService.createDocument({
    id: `Idea-${id}`,
    userId,
    ...args
  });
}

export function updateIdea(args: any) {
  return dynamoService.get(args.id)
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
      return dynamoService.createDocument(entity);
    });
}

export function deleteIdea(args: any, userId: string) {
  return dynamoService.get(args.id)
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
