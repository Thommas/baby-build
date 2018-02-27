/**
 * Path of child
 *
 * GraphQL - DynamoDB - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import * as db from './dynamo';

const TableName = 'build';

export function getBuilds() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'title',
      'description',
      'child_id',
    ],
  };

  return db.scan(params);
}

export function getBuildById(id) {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function getBuildsByChild(childId) {
  const params = {
    TableName,
    FilterExpression: 'child_id = :child_id',
    ExpressionAttributeValues: { ':child_id': childId },
  };

  return db.scan(params);
}

export function createBuild(args) {
  const params = {
    TableName,
    Item: {
      id: nanoid(12),
      title: args.title,
      description: args.description,
      child_id: args.child_id,
    },
  };

  return db.createItem(params);
}

export function updateBuild(args) {
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
      ':child': args.child,
      ':description': args.description,
    },
    UpdateExpression: 'SET title = :title, child = :child, #description = :description',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function deleteBuild(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
