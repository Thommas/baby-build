/**
 * Path of build
 *
 * GraphQL - DynamoDB - Task
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import * as db from './dynamo';

const TableName = process.env.TASK_TABLE;

export function getTasks(buildId, userId) {
  const params = {
    TableName,
    FilterExpression: 'build_id = :build_id AND user_id = :user_id',
    ExpressionAttributeValues: {
      ':build_id': buildId,
      ':user_id': userId
    },
  };

  return db.scan(params);
}

export function createTask(args, userId) {
  const params = {
    TableName,
    Item: {
      id: generate('0123456789', 20),
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      type: 'default',
      ...args,
      user_id: userId
    },
  };

  return db.createItem(params);
}

export function updateTask(args, userId) {
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

export function deleteTask(args, userId) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
