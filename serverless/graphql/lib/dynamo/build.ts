/**
 * Path of build
 *
 * GraphQL - DynamoDB - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import * as db from './dynamo';

const TableName = process.env.BUILD_TABLE;

export function getBuilds(userId) {
  const params = {
    TableName,
    FilterExpression: 'user_id = :user_id',
    ExpressionAttributeValues: { ':user_id': userId }
  };

  return db.scan(params);
}

export function getBuildById(id, userId) {
  const params = {
    TableName,
    FilterExpression: 'user_id = :user_id',
    ExpressionAttributeValues: { ':user_id': userId },
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function createBuild(args, userId) {
  const params = {
    TableName,
    Item: {
      id: generate('0123456789', 20),
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      xp: 0,
      lvl: 1,
      ...args,
      user_id: userId
    },
  };

  return db.createItem(params);
}

export function updateBuild(args, userId) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':name': args.name,
      ':description': args.description
    },
    UpdateExpression: `SET name = :name, description = :description`,
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function deleteBuild(args, userId) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
