/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { queryUsersBySearchQuery } from '../elasticsearch/user';
import { dynamoService } from '../services';

export function getAuthUser(userId: string) {
  return dynamoService.get(userId)
    .then((entity: any) => {
      if (!entity) {
        return dynamoService.createDocument({
          type: 'user',
          id: userId,
          xp: 0,
          lvl: 1,
        });
      }
      return entity;
    });
}

export function getUsers(args: any) {
  return queryUsersBySearchQuery(args.searchQuery)
    .then((entities: any) => {
      const ids: any = entities.hits.hits.map((hit: any) => hit._id);
      if (ids.length === 0) {
        return [];
      }
      return dynamoService.batchGet(ids);
    });
}

export function getUser(userId: string) {
  return dynamoService.get(userId)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('User not found');
      }
      return entity;
    });
}

export function updateUser(args: any, userId: string) {
  return dynamoService.get(userId)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('User not found');
      }
      entity.firstName = args.firstName;
      entity.lastName = args.lastName;
      return dynamoService.createDocument(entity);
    });
}
