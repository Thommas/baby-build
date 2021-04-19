/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { queryUsersBySearchQuery } from '../elasticsearch/user';
import { dynamoService } from '../services';

export function getAuthUser(userId: string) {
  return dynamoService.getEntity().get(userId)
    .then((entity: any) => {
      if (!entity) {
        const Entity = dynamoService.getEntity();
        entity = new Entity({
          type: 'user',
          id: userId,
          xp: 0,
          lvl: 1,
        });
        return dynamoService.persist(entity);
      }
      return entity;
    });
}

export function getUsers(args: any) {
  return queryUsersBySearchQuery(args.searchQuery)
    .then((entities: any) => {
      const params: any = entities.hits.hits.map((hit: any) => ({id: hit._id}));
      if (params.length === 0) {
        return [];
      }
      return dynamoService.getEntity().batchGet(params);
    });
}

export function getUser(userId: string) {
  return dynamoService.getEntity().get(userId)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('User not found');
      }
      return entity;
    });
}

export function updateUser(args: any, userId: string) {
  return dynamoService.getEntity().get(userId)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('User not found');
      }
      entity.firstName = args.firstName;
      entity.lastName = args.lastName;
      return dynamoService.persist(entity);
    });
}
