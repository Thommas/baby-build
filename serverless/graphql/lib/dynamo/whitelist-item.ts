/**
 * Path of child
 *
 * GraphQL - DynamoDB - Whitelist Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import * as db from './dynamo';

const TableName = 'whitelist_item';

export function getWhitelistItems(category) {
  const params = {
    TableName,
    FilterExpression: 'category = :category',
    ExpressionAttributeValues: { ':category': category },
  };

  return db.scan(params);
}

export function getWhitelistItemById(id) {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function createWhitelistItem(args) {
  const params = {
    TableName,
    Item: {
      id: nanoid(12),
      ...args
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
