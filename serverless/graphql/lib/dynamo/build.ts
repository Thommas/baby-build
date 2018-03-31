/**
 * Path of child
 *
 * GraphQL - DynamoDB - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import * as db from './dynamo';

const TableName = process.env.BUILD_TABLE;

export function getBuilds(childId, userId) {
  const params = {
    TableName,
    FilterExpression: 'user_id = :user_id AND child_id = :child_id',
    ExpressionAttributeValues: { ':child_id': childId, ':user_id': userId },
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
      id: nanoid(12),
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      title: args.title,
      description: args.description,
      child_id: args.child_id,
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
      ':title': args.title,
      ':description': args.description,
    },
    UpdateExpression: 'SET title = :title, description = :description',
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
