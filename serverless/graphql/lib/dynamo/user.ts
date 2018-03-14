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

export function createUser(args) {
  const params = {
    TableName,
    Item: {
      id: nanoid(12),
      created_at: new Date(),
      updated_at: new Date(),
      ...args
    },
  };

  return db.createItem(params);
}

export function updateUser(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':xp': args.xp,
      ':level': args.level
    },
    UpdateExpression: `SET xp = :xp,
    level = :level`,
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function deleteUser(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
