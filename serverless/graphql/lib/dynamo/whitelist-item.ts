/**
 * Path of child
 *
 * GraphQL - DynamoDB - Whitelist Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import * as db from './dynamo';

const TableName = process.env.WHITELIST_ITEM_TABLE;

export function getWhitelistItems(category, userId) {
  const params = {
    TableName,
    FilterExpression: 'user_id = :user_id AND category = :category',
    ExpressionAttributeValues: { ':category': category, ':user_id': userId },
  };

  return db.scan(params);
}

export function getWhitelistItemById(id, userId) {
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

export function createWhitelistItem(args, userId) {
  const params = {
    TableName,
    Item: {
      id: nanoid(12),
      created_at: new Date(),
      updated_at: new Date(),
      ...args,
      user_id: userId
    },
  };

  return db.createItem(params);
}

export function updateWhitelistItem(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':category': args.category,
      ':title': args.title,
      ':required_age': args.required_age
    },
    UpdateExpression: `SET category = :category,
    title = :title,
    required_age = :required_age`,
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function deleteWhitelistItem(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
