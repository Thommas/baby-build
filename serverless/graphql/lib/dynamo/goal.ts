/**
 * Path of child
 *
 * GraphQL - DynamoDB - Goal
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import * as db from './dynamo';

const TableName = process.env.GOAL_TABLE;

export function getGoals(buildId, child_year, userId) {
  const params = {
    TableName,
    FilterExpression: 'build_id = :build_id AND child_year = :child_year AND user_id = :user_id',
    ExpressionAttributeValues: {
      ':build_id': buildId,
      ':child_year': child_year,
      ':user_id': userId
    },
  };

  return db.scan(params);
}

export function getGoal(id, userId) {
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

export function createGoal(args, userId) {
  const params = {
    TableName,
    Item: {
      id: nanoid(12),
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      user_id: userId,
      ...args
    },
  };

  return db.createItem(params);
}

export function updateGoal(args, userId) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':title': args.title,
      ':description': args.description,
    },
    UpdateExpression: 'SET title = :title, description = :description',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function deleteGoal(args, userId) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
