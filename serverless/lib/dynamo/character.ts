/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { nanoid } from 'nanoid'
import { orderBy } from 'lodash';
import { queryCharacters } from '../elasticsearch/character';
import { querySharingsByUserId } from '../elasticsearch/sharing';
import { dynamoService } from '../services';

export function getCharacters(userId: string, args: any) {
  const characterInput = args.characterInput;
  const cursor = args.cursor;
  const sort = args.sort;
  return querySharingsByUserId(userId)
    .then((sharings) => {
      const userIds = sharings.hits.hits.map((hit: any) => hit._source.sharerId);
      userIds.push(userId);
      return queryCharacters(userIds, characterInput, sort, cursor)
    })
    .then((characters) => {
      if (0 === characters.hits.total.value || 0 === characters.hits.hits.length) {
        return {
          total: 0,
          cursor: '-1',
          nodes: [],
        };
      }
      const params: any = characters.hits.hits.map((hit: any) => ({id: hit._id}));
      console.log('params', params);
      return dynamoService.getEntity().batchGet(params).then((items: any) => {
        console.log('items', items);
        return {
          total: characters.hits.total.value,
          cursor: characters.hits.hits[characters.hits.hits.length - 1]._source['createdAt'],
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

export function getCharactersByIds(ids: string[]) {
  if (!ids || 0 === ids.length) {
    return [];
  }

  const params: any = ids.map((id: any) => ({ id }));

  return dynamoService.getEntity().batchGet(params);
}

export function createCharacter(args: any, userId: string) {
  const id = nanoid();
  const Entity = dynamoService.getEntity();
  const entity = new Entity({
    id: `Character-${id}`,
    userId,
    imgsReady: false,
    ...args
  });
  return dynamoService.persist(entity);
}

export function updateCharacter(args: any, userId: string) {
  return dynamoService.getEntity().get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Character not found');
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

export function deleteCharacter(args: any, userId: string) {
  return dynamoService.getEntity().get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Character not found');
      }
      if (entity.userId !== userId) {
        throw new Error('Unauthorized');
      }
      return entity.delete();
    });
}

export function addAudio(args: any, userId: string) {
  return dynamoService.getEntity().get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Character not found');
      }
      // FIXME Need to check sharing permission
      // if (entity.userId !== userId) {
      //   throw new Error('Unauthorized');
      // }
      const Entity = dynamoService.getEntity();
      const id = nanoid();
      const newFile = new Entity({
        id: `File-${id}`,
        userId,
        name: args.name,
        size: args.size,
        type: args.type,
        data: args.data,
      });
      return newFile.save().then((file: any) => {
        if (!entity.audios) {
          entity.audios = [];
        }
        entity.audios.push(file.id);
        return dynamoService.persist(entity);
      });
    });
}

export function removeAudio(args: any, userId: string) {
  return dynamoService.getEntity().get(args.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Character not found');
      }
      // FIXME Need to check sharing permission
      // if (entity.userId !== userId) {
      //   throw new Error('Unauthorized');
      // }
      const audios = entity.audios.filter((audioId: string) => audioId === args.fileId);
      if (audios.length === 1) {
        dynamoService.getEntity().get(audios[0]).then((file) => {
          if (file) {
            console.log('FOUND FILE TO DELETE');
            file.delete();
          }
        });
      }

      entity.audios = entity.audios.filter((audioId: string) => audioId !== args.fileId);
      console.log('entity.audios', entity.audios);
      return dynamoService.persist(entity);
    });
}
