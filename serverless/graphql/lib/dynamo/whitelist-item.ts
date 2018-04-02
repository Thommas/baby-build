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

export function getWhitelistItems(buildId, year, userId) {
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

export function createWhitelistItem(args, userId) {
  const params = {
    TableName,
    Item: {
      id: nanoid(12),
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
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
      ':title': args.title,
      ':category': args.category
    },
    UpdateExpression: `SET title = :title, category = :category`,
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
