/**
 * Path of child
 *
 * GraphQL - DynamoDB - Favorite
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import * as db from './dynamo';

const TableName = process.env.FAVORITE_TABLE;

export function getFavorites(buildId, child_year, userId) {
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

export function createFavorite(args, userId) {
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

export function updateFavorite(args, userId) {
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

export function deleteFavorite(args, userId) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
