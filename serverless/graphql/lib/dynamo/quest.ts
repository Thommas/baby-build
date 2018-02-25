/**
 * Path of child
 *
 * GraphQL - DynamoDB - Quest
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid = require('uuid/v4');
import * as db from './dynamo';

const TableName = 'quest';

export function getQuests() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'title',
      'description',
      'build_id',
    ],
  };

  return db.scan(params);
}

export function getQuestById(id) {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function getQuestsByBuild(buildId) {
  const params = {
    TableName,
    FilterExpression: 'build_id = :build_id',
    ExpressionAttributeValues: { ':build_id': buildId },
  };

  return db.scan(params);
}

export function createQuest(args) {
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

export function updateQuest(args) {
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

export function deleteQuest(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
