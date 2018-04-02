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

export function getGoals(buildId, year, userId) {
  const params = {
    TableName,
    FilterExpression: 'build_id = :build_id AND year = :year AND user_id = :user_id',
    ExpressionAttributeValues: {
      ':build_id': buildId,
      ':year': year,
      ':user_id': userId
    },
  };

  return db.scan(params);
}

export function createGoal(args, userId) {
  const params = {
    TableName,
    Item: {
      id: nanoid(12),
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      title: args.title,
      build_id: args.build_id
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
    ExpressionAttributeNames: {
      '#description': 'description',
    },
    ExpressionAttributeValues: {
      ':title': args.title,
      ':description': args.description,
    },
    UpdateExpression: 'SET title = :title, #description = :description',
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
