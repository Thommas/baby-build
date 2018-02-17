/**
 * Path of child
 *
 * GraphQL - DynamoDB
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid = require('uuid/v4');
import * as db from './dynamo';

const TableName = 'build';

export function getBuilds() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'title',
      'description',
      'child',
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
    FilterExpression: 'child = :child_id',
    ExpressionAttributeValues: { ':child_id': childId },
  };

  return db.scan(params);
}

export function createBuild(args) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      title: args.title,
      child: args.child,
      description: args.description,
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
