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

export function getWhitelistItems(buildId, category, userId) {
  const params = {
    TableName,
    FilterExpression: 'build_id = :build_id AND user_id = :user_id AND category = :category',
    ExpressionAttributeValues: {
      ':build_id': buildId,
      ':category': category,
      ':user_id': userId
    },
  };

  return db.scan(params);
}

export function createWhitelistItem(args, userId) {
  const params = {
    TableName,
    Item: {
      id: nanoid(12),
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      build_id: args.build_id,
      ...args,
      user_id: userId
    },
  };

  return db.createItem(params);
}

export function updateWhitelistItem(args, userId) {
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

export function deleteWhitelistItem(args, userId) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
