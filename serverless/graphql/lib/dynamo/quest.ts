/**
 * Path of child
 *
 * GraphQL - DynamoDB - Quest
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import * as db from './dynamo';

const TableName = process.env.QUEST_TABLE;

export function getQuests(buildId, child_year, userId) {
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

export function getQuest(id, userId) {
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

export function createQuest(args, userId) {
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

export function updateQuest(args, userId) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':title': args.title,
      ':description': args.description,
      ':option1': args.option1,
      ':option2': args.option2,
      ':option3': args.option3,
      ':quest_type': args.quest_type,
    },
    UpdateExpression: `SET title = :title,
      description = :description,
      option1 = :option1,
      option2 = :option2,
      option3 = :option3,
      quest_type = :quest_type`,
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function deleteQuest(args, userId) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
