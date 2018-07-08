/**
 * Path of user
 *
 * GraphQL - DynamoDB - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import * as db from './dynamo';

const TableName = process.env.USER_TABLE;

export function getUsers() {
  const params = {
    TableName,
    AttributesToGet: [
      'id'
    ],
  };

  return db.scan(params);
}

export function getUserById(id) {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function createUser(userId) {
  const params = {
    TableName,
    Item: {
      id: userId,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      xp: 0,
      lvl: 1
    },
  };

  return db.createItem(params);
}

export function updateUser(args, userId) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':current_build_id': args.current_build_id
    },
    UpdateExpression: `SET current_build_id = :current_build_id`,
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function getUserByIdOrCreate(userId) {
  return getUserById(userId).then((user) => {
    if (user) {
      return user;
    }
    return createUser(userId);
  })
}
